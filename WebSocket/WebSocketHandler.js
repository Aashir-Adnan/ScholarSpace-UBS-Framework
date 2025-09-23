const { executeQuery } = require("../Database/queryExecution");
const { projectDB } = require("../Database/projectDb");

// Heartbeat timer management
const heartbeatTimers = {}; 
const expiration_limit = process.env.Quiz_Disconnection_Limit;

function initializeHeartbeatTimers(quizId, participants, io) {
    if (!heartbeatTimers[quizId]) heartbeatTimers[quizId] = {};
    
    participants.forEach(participant => {
        if (participant.role === "student") {
            heartbeatTimers[quizId][participant.socket_id] = setTimeout(() => {
                // Remove student if heartbeat missed for 15s
                participants = participants.filter(pp => pp.socket_id !== participant.socket_id);
                io.to(quizId).emit("room-participants", participants);
                console.log(`Student ${participant.name} removed from quiz ${quizId} due to timeout`);
                
                // Emit to specific student that they were disconnected
                io.to(participant.socket_id).emit("quiz-cancelled", "Disconnected due to timeout");
            }, expiration_limit || 15000);
        }
    });
}

function resetHeartbeatTimer(quizId, socketId, participants, io) {
    if (heartbeatTimers[quizId] && heartbeatTimers[quizId][socketId]) {
        clearTimeout(heartbeatTimers[quizId][socketId]);
        
        const participant = participants.find(p => p.socket_id === socketId);
        if (!participant) return false;
        
        heartbeatTimers[quizId][socketId] = setTimeout(() => {
            participants = participants.filter(pp => pp.socket_id !== socketId);
            io.to(quizId).emit("room-participants", participants);
            console.log(`${participant.role} ${participant.name} removed from quiz ${quizId} due to timeout`);
            io.to(socketId).emit("quiz-cancelled", "Disconnected due to timeout");
        }, expiration_limit || 15000);
        
        return true;
    }
    return false;
}

function clearHeartbeatTimer(quizId, socketId) {
    if (heartbeatTimers[quizId] && heartbeatTimers[quizId][socketId]) {
        clearTimeout(heartbeatTimers[quizId][socketId]);
        delete heartbeatTimers[quizId][socketId];
        return true;
    }
    return false;
}

function clearAllHeartbeatTimers(quizId) {
    if (heartbeatTimers[quizId]) {
        Object.values(heartbeatTimers[quizId]).forEach(timer => clearTimeout(timer));
        delete heartbeatTimers[quizId];
        return true;
    }
    return false;
}

function handleConnectionHeartbeat(quizId, socketId, participants, socket, io) {
    if (!heartbeatTimers[quizId] || !heartbeatTimers[quizId][socketId]) {
        return socket.emit("heartbeat-error", "No active timer found");
    }

    // Find participant to get their info
    const participant = participants.find(p => p.socket_id === socketId);
    if (!participant) {
        return socket.emit("heartbeat-error", "Participant not found");
    }

    // Reset the 15-second disconnection timer
    clearTimeout(heartbeatTimers[quizId][socketId]);
    heartbeatTimers[quizId][socketId] = setTimeout(() => {
        // Remove participant after 15 seconds of no heartbeat
        participants = participants.filter(pp => pp.socket_id !== socketId);
        io.to(quizId).emit("room-participants", participants);
        console.log(`${participant.role} ${participant.name} removed from quiz ${quizId} due to timeout`);
        
        // Notify the disconnected user
        io.to(socketId).emit("quiz-cancelled", "Disconnected due to timeout");
    }, expiration_limit || 15000);

    socket.emit("heartbeat-ok", { timestamp: Date.now() });
    console.log(`Heartbeat refreshed for ${participant.name} in quiz ${quizId}`);
}

async function isHost(quizId, participant) {
    try {
      const connection = await projectDB();
      const verifyHostQuery = `SELECT created_by FROM subcomponents WHERE sub_component_id = ?`;
      const quizData = await executeQuery(verifyHostQuery, quizId, connection);
  
      if (quizData[0]?.created_by !== participant.urdd) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error("Error in isHost:", error);
      return false; 
    }
  }

    async function getAndEmitQuestions(quizId, socket,io) {
        let connection;
        try {
          connection = await projectDB();
          const subComponentQuery = `SELECT * from subcomponents where sub_component_id = ?`;
          const subComponentResults = await executeQuery(subComponentQuery, quizId, connection, false);
          if (!subComponentResults || subComponentResults.length === 0) {
            return socket.emit("error", "Error in quiz configuration, please contact support.");
          }
      
          const quiz = subComponentResults[0];
      
          let quizConfig = {};
          try {
            quizConfig = quiz.config ? JSON.parse(quiz.config) : {};
          } catch (err) {
            console.error("Invalid JSON in quiz config:", err);
          }
      
          const questionQuery = `
            SELECT COUNT(*) OVER () AS table_count, question_id, cloid, sub_component_id,
                  question_num, description, question_marks, lectures_topic_id, status,
                  created_by, updated_by, created_at, updated_at, config
            FROM questions 
            WHERE sub_component_id = ?
          `;
          const questions = await executeQuery(questionQuery, quizId, connection, false);
      
          if (!questions || questions.length === 0) {
            // console.log("No questions registered against this quiz");
            socket.emit("error", "No questions registered against this quiz");
          }
      
          // ✅ Process questions
          for (let q of questions) {
            try {
              const optionsQuery = `SELECT options FROM questionssolution WHERE question_id = ?`;
              const optionsResult = await executeQuery(optionsQuery, [q.question_id], connection, false);
      
              if (optionsResult?.length > 0) {
                try {
                  q.options = JSON.parse(optionsResult[0].options);
                } catch (err) {
                  console.error("Invalid JSON in options for question_id:", q.question_id, err);
                  q.options = [];
                }
              } else {
                q.options = [];
              }
            } catch (err) {
              console.error("Error fetching options for question_id:", q.question_id, err);
              q.options = [];
            }
          }
      
          // ✅ Emit quiz start
          const total_questions = questions[0].table_count || 0;
          const quizStartedPayload = {
            quizName: quiz.sub_component_num,
            totalQuestions: total_questions,
            description: quiz.text,
            quizId: quiz.sub_component_id,
            // questions,
            questionIndex: 0,
            currentQuestion: questions[0],
            allQuestions: questions,
          };
          console.log("resultsssssssssssssss::::: ", questions);
          //quiz wil be started from host (on my start-quiz event)
          // socket.emit("quiz-started", { quizStartedPayload });
          // console.log("Socket emitted event quiz-started, payload: ", quizStartedPayload);
          
          io.to(quizId).emit("quiz-started", { 
            message: "Quiz started successfully",
            totalQuestions: total_questions,
            quizStartedPayload: quizStartedPayload
          });

          return { success: true };
      
        } catch (err) {
          console.error("Unexpected error in getAndEmitQuestions:", err);
          if (socket) socket.emit("error", "Internal server error");
          return { success: false, error: err.message };
        } finally {
          if (connection) {
            try {
              await connection.release();
            } catch (err) {
              console.error("Error releasing DB connection:", err);
            }
          }
        }
      }
      


  async function submitAnswer(answer, questionId, option, participant, quizId) {
    let connection;
    try {
      connection = await projectDB();
  
      // ✅ Get enrollment ID safely with parameterized query
      const getEnrollmentIdQuery = `
        SELECT enrollement_id 
        FROM enrollements e
        JOIN studentsemesters ss ON e.student_semester_id = ss.student_semester_id
        JOIN students s ON ss.student_user_id = s.student_user_id
        WHERE s.urdd_id = ?
      `;
      const enrollmentRows = await executeQuery(getEnrollmentIdQuery, [participant.urdd], connection,false);
      if (!enrollmentRows || enrollmentRows.length === 0) {
        throw new Error("Enrollment not found for participant");
      }
      const studentEnrollmentId = enrollmentRows[0].enrollement_id;
  
      // // ✅ Get quiz config
      // const getConfigQuery = `SELECT config FROM subcomponents WHERE sub_component_id = ?`;
      // const configResult = await executeQuery(getConfigQuery, [quizId], connection);
  
      // let correctAnswerScore = 0;
      // let wrongAnswerScore = 0;
  
      // if (configResult.length > 0) {
      //   try {
      //     const config = JSON.parse(configResult[0].config);
      //     correctAnswerScore = config?.correct_answer_score ?? 0;
      //     wrongAnswerScore = config?.wrong_answer_score ?? 0;
      //   } catch (err) {
      //     console.error("Invalid JSON in config:", err);
      //   }
      // }
  
      // const score = answer.correct ? correctAnswerScore : wrongAnswerScore;
  
      const submitAnswerQuery = `
        INSERT INTO questionevaluations
        (enrollement_id, question_id, student_answer, obtained_marks, status) 
        VALUES (?, ?, ?, ?, ?)
      `;
      const values = [studentEnrollmentId, questionId, option, null, "active"];
      await executeQuery(submitAnswerQuery, values, connection);
  
      return { success: true };
  
    } catch (err) {
      console.error("Error in submitAnswer:", err);
      return { success: false, error: err.message };
    } 
  }
  

  async function addtoLog(message, urdd, quizId) {
    try {
      const logQuery = `
        INSERT INTO socket_activity_log (urdd_id, sub_component_id, activity_description)
        VALUES (?, ?, ?)
      `;
      await executeQuery(logQuery, [urdd, quizId, message]);
    } catch (err) {
      console.error("Failed to write log:", err);
    }
  }

module.exports = {
    isHost,
    getAndEmitQuestions,
    initializeHeartbeatTimers,
    resetHeartbeatTimer,
    clearHeartbeatTimer,
    clearAllHeartbeatTimers,
    handleConnectionHeartbeat,
    submitAnswer,
    addtoLog
  };