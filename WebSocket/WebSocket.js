const { Server } = require('socket.io');
const { executeQuery } = require("../Database/queryExecution");
const { projectDB } = require("../Database/projectDb");
const { 
  isHost, 
  getAndEmitQuestions, 
  // initializeHeartbeatTimers, 
  // resetHeartbeatTimer, 
  // clearHeartbeatTimer, 
  // clearAllHeartbeatTimers, 
  // handleConnectionHeartbeat,
  submitAnswer,
  addtoLog
} = require('./WebSocketHandler');

function setupWebSocket(server) {
  const io = new Server(server, { 
    path: '/websocket',
    cors: {
      origin: "*",           
      methods: ["GET", "POST"], 
      credentials: false        
    },
    transports : ['websocket','xhr-polling'],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    pingTimeout: 20000,        // how long server waits for pong
    pingInterval: 25000, 
    
   });
      // In-memory stores
      const participants = {}; 
      const quizzes = {};
      const blockedUsers = new Map();
      const completedQuizzes = new Set(); // Track completed quizzes by student
      
      
    io.on('connection', (socket) => {
      console.log("New client connected:", socket.id);
      //sending confirmation for successfull socket connection
      socket.emit('connection-status', {
        connected: true,
        socketId: socket.id,
        timestamp: Date.now(),
      });  
      

  
      socket.on("join-quiz", async ({ quizId, participant }) => {
        console.log("----------------- INSIDE JOIN QUIZ EVENT: QuizID & PARTICIPANT:", quizId, participant);
        
        // Check if student has already completed the quiz
        if (participant.role === 'student') {
          const studentKey = `${quizId}:${participant.urdd}`;
          
          if (completedQuizzes.has(studentKey)) {
            console.log(`⛔ User ${participant.urdd} has already completed quiz ${quizId}`);
            return socket.emit('error', {
              message: 'You have already completed this quiz and cannot rejoin',
              completed: true
            });
          }
        }
        if (!participants[quizId]) {
          participants[quizId] = [];
          quizzes[quizId] = { questions: [], currentIndex: 0, isStarted: false };
        }
        console.log( "particiapnts are:::",participants[quizId]);
        if (blockedUsers.has(quizId) && blockedUsers.get(quizId).has(participant.urdd)) {
          console.log(`⛔ User ${participant.urdd} is blocked from quiz ${quizId}`);
          return socket.emit('error', {
            message: 'You have been blocked from this quiz by the host',
            blockedBy: 'Host'
          });
        }
        const quiz = quizzes[quizId];
        
        if (quiz && quiz.isStarted) {
          const existingParticipant = participants[quizId].find(p => p.urdd === participant.urdd);
          if (!existingParticipant) {
            return socket.emit("error", "Quiz has already started. New participants cannot join.");
          }
          
          existingParticipant.socket_id = socket.id;
          socket.join(quizId);
          // io.to(quizId).emit("quiz-stasrted", "hello world");

          console.log(`Quiz ${quizId} rejoined by ${participant.name} (${participant.role}) - reconnecting`);
          addtoLog("Quiz rejoined", participant.urdd);

          // try {
          //   await getAndEmitQuestions(quizId, socket);
          // } catch (error) {
          //   console.error('Error sending questions to reconnecting participant:', error);
          //   socket.emit("error", "Failed to load quiz questions");
          // }
        } 
        else {
          const existingParticipant = participants[quizId].find(p => p.urdd === participant.urdd);
          if (existingParticipant) {
            existingParticipant.socket_id = socket.id;
          } else {
            addtoLog("Quiz joined", participant.urdd);
            participants[quizId].push({ 
              socket_id: socket.id, 
              urdd: participant.urdd, 
              name: participant.name, 
              role: participant.role, 
            });
          }
          socket.join(quizId);




/////////////////////////////////////////////////


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

              // 🔹 Parse config JSON (if exists)
              if (q.config) {
                try {
                  q.config = JSON.parse(q.config);
                } catch (err) {
                  console.error("Invalid JSON in config for question_id:", q.question_id, err);
                  q.config = {};
                }
              } else {
                q.config = {};
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

 try {
            await getAndEmitQuestions(quizId, socket,io);
          } catch (error) {
            console.error('Error sending questions to reconnecting participant:', error);
            socket.emit("error", "Failed to load quiz questions");
          }


///////////////////////////////////////////////////



         

          console.log(`Quiz ${quizId} joined by ${participant.name} (${participant.role})`);
        }
        
        // Updated participant list to show on frontend
        // io.to(quizId).emit("room-participants", participants[quizId]);
      });




      socket.on("start-quiz", async ({ quizId, participant }) => {
        console.log("----------------- INSIDE MANUAL START QUIZ EVENT: QuizID & PARTICIPANT:" ,quizId, participant);
        const quiz = quizzes[quizId];
        if (!quiz) return socket.emit("error", "Quiz not found");
        
        // if (!(await isHost(quizId, participant))) {
        //   return socket.emit("error", "You are not the host of this quiz");
        // }
        try {
          quiz.currentIndex = 0;
          quiz.isStarted = true;

          try {
            await getAndEmitQuestions(quizId, socket,io);
          } catch (error) {
            console.error('Error sending questions to reconnecting participant:', error);
            socket.emit("error", "Failed to load quiz questions");
          }

          
          // initializeHeartbeatTimers(quizId, participants[quizId], io);
          console.log(`Quiz ${quizId} started by host ${participant.name}`);
        } catch (error) {
          console.error('Error starting quiz:', error);
          socket.emit("error", "Failed to start quiz");
        }
      });




      socket.on("next-question", async ({ quizId, participant }) => {
        console.log("----------------- INSIDE MANUAL NEXT QUESTION EVENT: " );
        const quiz = quizzes[quizId];
        if (!quiz || !quiz.isStarted) return socket.emit("error", "Quiz not found or not started");
        
        // Only allow host to move to next question
        if (!(await isHost(quizId, participant))) {
          return socket.emit("error", "You are not the host of this quiz");
        }
        quiz.currentIndex++;
        if (quiz.currentIndex >= quiz.questions.length) {
          io.to(quizId).emit("quiz-completed");
          
          // clearAllHeartbeatTimers(quizId);
          
          console.log(`Quiz ${quizId} completed`);
        } else {
          const nextQuestion = quiz.questions[quiz.currentIndex];
          io.to(quizId).emit("next-question", {
            question: nextQuestion,
            questionIndex: quiz.currentIndex,
            totalQuestions: quiz.questions.length
          });
          
          console.log(`Quiz ${quizId} moved to question ${quiz.currentIndex + 1}`);
        }
      });




      socket.on("submit-answer", async ({quizId, answer, questionIndex, selectedOptionText, participant, totalQuestions }) => {
        console.log("----------------- INSIDE SUBMIT ANSWER EVENT: " , quizId, "answerrr is ", answer);
        console.log("quizId:", quizId);
        console.log("answer:", answer);
        console.log("questionId:", questionIndex);
        console.log("option:", selectedOptionText);
        console.log("participant:", participant);
        
        const quiz = quizzes[quizId];
        const studentKey = `${quizId}:${participant.urdd}`;
        
        // Check if already completed
        if (completedQuizzes.has(studentKey)) {
         socket.emit('error', {
            message: 'You have already completed this quiz',
            completed: true
          });
        }
        
        const student = participants[quizId]?.find(p => p.socket_id === socket.id && p.role === 'student' && p.urdd === participant.urdd);
        if (!student) {
          return socket.emit("error", "Student not found in quiz");
        }

        console.log(`Answer received for quiz ${quizId} from ${student.name} (${socket.id}): ${answer}`);
        
        // Submit the answer
        await submitAnswer(answer, questionIndex, selectedOptionText, participant, quizId);
        
        // Check if this was the last question
        if (totalQuestions && questionIndex >= totalQuestions - 1) {
          console.log(`✅ User ${participant.urdd} has completed quiz ${quizId}`);
          completedQuizzes.add(studentKey);
          
          // Notify the student they've completed the quiz
          socket.emit('quiz-completed', {
            message: 'You have successfully completed the quiz!'
          });
        }
        

        // resetHeartbeatTimer(quizId, socket.id, participants[quizId], io);
      });





      // socket.on("connection-heartbeat", ({ quizId }) => {
      //   handleConnectionHeartbeat(quizId, socket.id, participants[quizId], socket, io);
      // });



      socket.on('block-user', ({ quizId, participant }) => {
        console.log('🚫 Received block-user event:', { quizId, participant: participant?.urdd });

        if (!blockedUsers.has(quizId)) {
          blockedUsers.set(quizId, new Set());
        }


        const blockedSet = blockedUsers.get(quizId);
        blockedSet.add(participant?.urdd);
        console.log(`✅ User ${participant?.urdd } blocked from quiz ${quizId}`);

        const blockedParticipant = participants[quizId]?.find(p => p.urdd === participant?.urdd );
        if (blockedParticipant) {
          console.log(`🔌 Disconnecting blocked user: ${participant?.urdd }`);
          io.to(blockedParticipant.socket_id).emit('blocked', {
            message: 'You have been blocked by the host',
            blockedBy: participant.name
          });
          io.sockets.sockets.get(blockedParticipant.socket_id)?.disconnect(true);
          
          // Remove from participants
          participants[quizId] = participants[quizId].filter(p => p.urdd !== participant?.urdd );
          io.to(quizId).emit('room-participants', participants[quizId]);
        }
        
       
      });



      socket.on("end-quiz", async ({ quizId, participant }) => {
        const quiz = quizzes[quizId];
        if (!quiz) return socket.emit("error", "Quiz not found");
        
       if (!(await isHost(quizId, participant))) {
        return socket.emit("error", "You are not the host of this quiz");
      }
        
        // clearAllHeartbeatTimers(quizId);
        
        io.to(quizId).emit("quiz-ended", {
          message: "Quiz ended by host",
          endedBy: hostParticipant.name
        });
        
        console.log(`Quiz ${quizId} ended by host ${hostParticipant.name}`);
      });
    


      socket.on("cancel-quiz", async ({ quizId, participant }) => {
        if (!participants[quizId]) return;
        
        if (!(await isHost(quizId, participant))) {
          return socket.emit("error", "You are not the host of this quiz");
        }
        // clearHeartbeatTimer(quizId, socket.id);
        
        participants[quizId] = participants[quizId].filter(p => p.socket_id !== socket.id);
        socket.leave(quizId);
        
        io.to(quizId).emit("room-participants", participants[quizId]);
        
        socket.emit("quiz-cancelled", "The quiz has been cancelled by the host");
        
        console.log(`${participantToCancel.role} ${participantToCancel.name} cancelled from quiz ${quizId}`);
      });



      socket.on("leave-quiz", ({ quizId }) => {
        console.log("User left quiz:", socket.id);
        
        if (participants[quizId]) {
          const participantIndex = participants[quizId].findIndex(p => p.socket_id === socket.id);
          if (participantIndex !== -1) {
            const removedParticipant = participants[quizId][participantIndex];
            participants[quizId].splice(participantIndex, 1);
            
            // clearHeartbeatTimer(quizId, socket.id);
            
            socket.to(quizId).emit("room-participants", participants[quizId]);
            
            console.log(`${removedParticipant.role} ${removedParticipant.name} left quiz ${quizId}`);
          }
        }
        
        socket.disconnect(true); // 'true' ensures closing the underlying connection
      });

      socket.on("disconnect", (reason) => {
        console.log(`User disconnected: ${socket.id} | Reason: ${reason}`);
        
        
      });

  });

  return io;
}

module.exports = setupWebSocket;






