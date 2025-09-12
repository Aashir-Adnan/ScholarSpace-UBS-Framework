const cron = require('node-cron');
const { executeQuery } = require('../Database/queryExecution.js');
const {projectDB} = require('../Database/projectDb.js');

class AutoRenewalCron {
  constructor() {
    this.isRunning = false;
    this.gracePeriodDays = 2; 
  }

  start() {
    console.log('Starting auto-renewal cron job');
    
    cron.schedule('*/1 * * * *', async () => {
      console.log('Auto-renewal cron job triggered (30-minute interval)');
      await this.processAllSubscriptions();
    });

    console.log('Auto-renewal cron job scheduled successfully');
  }

  async processAllSubscriptions() {
    if (this.isRunning) {
      console.log('Auto-renewal already running, skipping');
      return;
    }

    this.isRunning = true;
    
    try {
      console.log('Starting subscription processing');
      
      // Process subscriptions within grace period (retry until success)
      await this.processSubscriptionsWithinGracePeriod();
      
      // Process subscriptions beyond grace period (permission cleanup)
      await this.processSubscriptionsBeyondGracePeriod();
      
      console.log('Subscription processing completed');

    } catch (error) {
      console.error('Error in subscription processing:', error);
    } finally {
      this.isRunning = false;
    }
  }

  async processSubscriptionsWithinGracePeriod() {
    try {
      console.log('Step 1: Processing subscriptions within grace period');
      
      const withinGracePeriod = await this.findSubscriptionsWithinGracePeriod();
      
      if (withinGracePeriod.length === 0) {
        console.log('No subscriptions within grace period');
        return;
      }

      console.log(`Found ${withinGracePeriod.length} subscriptions within grace period`);

      // Process each subscription with retry logic
      for (const subscription of withinGracePeriod) {
        try {
          console.log(`Processing subscription ${subscription.id} (${subscription.plan_name})`);
          console.log(`   User: ${subscription.urdd_id}, Expires: ${subscription.expiry_date}`);
          console.log(`   Days until grace period ends: ${subscription.days_until_grace_end}`);
          
          // Try payment processing with retries
          const success = await this.processPaymentAttempt(subscription, true);
          
          if (success) {
            console.log(`Successfully processed subscription ${subscription.id}`);
          } else {
            console.log(`Subscription ${subscription.id} still in grace period, will retry next cycle`);
          }
          
          // Add delay between subscriptions
          await this.delay(1000);
          
        } catch (error) {
          console.error(`Failed to process subscription ${subscription.id}:`, error);
          continue;
        }
      }

    } catch (error) {
      console.error('Error processing subscriptions within grace period:', error);
    }
  }

  async processSubscriptionsBeyondGracePeriod() {
    try {
      console.log('Step 2: Processing subscriptions beyond grace period');
      
      const beyondGracePeriod = await this.findSubscriptionsBeyondGracePeriod();
      
      if (beyondGracePeriod.length === 0) {
        console.log('No subscriptions beyond grace period');
        return;
      }

      console.log(`Found ${beyondGracePeriod.length} subscriptions beyond grace period`);

      // Process each subscription through same flow but with no retries
      for (const subscription of beyondGracePeriod) {
        try {
          console.log(`Processing expired subscription ${subscription.id} (${subscription.plan_name})`);
          console.log(`   User: ${subscription.urdd_id}, Expired: ${subscription.expiry_date}`);
          console.log(`   Days since grace period ended: ${subscription.days_since_grace_end}`);
          
          // Final attempt with complete flow: PreProcess → PostProcess
          const success = await this.processPaymentAttempt(subscription, false);
          
          if (success) {
            console.log(`Final payment attempt succeeded for subscription ${subscription.id} - permissions assigned`);
          } else {
            console.log(`Final payment attempt failed for subscription ${subscription.id} - permissions cleaned up`);
            await this.markSubscriptionAsExpired(subscription);
          }
          
          console.log(`Successfully processed expired subscription ${subscription.id}`);
          await this.delay(1000);
          
        } catch (error) {
          console.error(`Failed to process expired subscription ${subscription.id}:`, error);
          continue;
        }
      }

    } catch (error) {
      console.error('Error processing subscriptions beyond grace period:', error);
    }
  }

  async findSubscriptionsWithinGracePeriod() {
    const query = `
      SELECT 
        s.*,
        p.name as plan_name,
        p.duration_type,
        p.ai_credits_amount,
        p.price,
        DATEDIFF(DATE_ADD(s.expiry_date, INTERVAL ${this.gracePeriodDays} DAY), NOW()) as days_until_grace_end
      FROM application_subscriptions s
      INNER JOIN plans p ON s.plan_id = p.id
      WHERE s.status = 'active' 
        AND s.auto_renew = 1
        AND DATE_ADD(s.expiry_date, INTERVAL ${this.gracePeriodDays} DAY) > NOW()
      ORDER BY s.expiry_date ASC
    `;
    
    const connection = await projectDB();
    
    try {
      return await executeQuery(query, [], connection, false);
    } finally {
      if (connection) connection.end();
    }
  }

  async findSubscriptionsBeyondGracePeriod() {
    const query = `
      SELECT 
        s.*,
        p.name as plan_name,
        p.duration_type,
        p.ai_credits_amount,
        p.price,
        DATEDIFF(NOW(), DATE_ADD(s.expiry_date, INTERVAL ${this.gracePeriodDays} DAY)) as days_since_grace_end
      FROM application_subscriptions s
      INNER JOIN plans p ON s.plan_id = p.id
      WHERE s.status = 'active' 
        AND s.auto_renew = 1
        AND DATE_ADD(s.expiry_date, INTERVAL ${this.gracePeriodDays} DAY) <= NOW()
      ORDER BY s.expiry_date ASC
    `;
    
    const connection = await projectDB();
    
    try {
      return await executeQuery(query, [], connection, false);
    } finally {
      if (connection) connection.end();
    }
  }

  async processPaymentAttempt(subscription, allowRetries = true) {
    try {
      console.log(`Attempting payment processing for subscription ${subscription.id}`);
      
      // Get user's default payment method
      const paymentMethodQuery = `
        SELECT 
          upm.supported_payment_method_id,
          spm.name as provider_name,
          spm.auto_renewal_type
        FROM user_payment_methods upm
        INNER JOIN supported_payment_methods spm ON upm.supported_payment_method_id = spm.id
        WHERE upm.urdd_id = ? 
          AND upm.is_default = 1 
          AND upm.is_active = 1 
          AND upm.is_verified = 1
      `;
      
      const connection = await projectDB();
      
      try {
        const paymentMethod = await executeQuery(paymentMethodQuery, [subscription.urdd_id], connection, false);
        
        if (!paymentMethod || paymentMethod.length === 0) {
          throw new Error(`No default payment method found for user ${subscription.urdd_id}`);
        }

        const selectedMethod = paymentMethod[0];
        
        // Create payload for existing system
        const autoRenewalPayload = {
          urdd_id: subscription.urdd_id,
          plan_id: subscription.plan_id,
          payment_method_id: selectedMethod.supported_payment_method_id,
          subscription_id: subscription.id,
          is_auto_renewal: true,
          renewal_method: 'cron_job'
        };

        console.log(`Calling paymentMethodRouter for subscription ${subscription.id}`);
        
        // Call existing paymentMethodRouter
        const paymentMethodRouter = require('../UtilityFunctions/PreProcessingFunctions/PaymentPlan/paymentMethodRouter.js');
        
        const mockReq = { body: autoRenewalPayload };
        const result = await paymentMethodRouter(mockReq, autoRenewalPayload);
        
        console.log(`Payment result for subscription ${subscription.id}:`, result.payment_response);
        
        // Integrate with existing post-process flow
        if (result.payment_response === 'success') {
          console.log(`Payment succeeded for subscription ${subscription.id}, calling paymentPlanHandler for permissions`);
          
          await this.callPaymentPlanHandler(subscription, 'success', result);
          await this.updateSubscriptionExpiry(subscription);
          
          return true;
          
        } else {
          // Payment failed - handle based on grace period
          if (allowRetries) {
            console.log(`Payment failed for subscription ${subscription.id}, still within grace period - will retry next cycle`);
            console.log(`   No post-process called - subscription stays active for retry`);
            return false; // Will retry next cycle
          } else {
            console.log(`Payment failed for subscription ${subscription.id}, grace period exhausted - calling paymentPlanHandler for cleanup`);
            
            await this.callPaymentPlanHandler(subscription, 'failed', result);
            
            return false; // No more retries
          }
        }
        
      } finally {
        connection.end();
      }
      
    } catch (error) {
      console.error(`Error processing payment for subscription ${subscription.id}:`, error);
      return false;
    }
  }

  async callPaymentPlanHandler(subscription, status, paymentResult) {
    try {
      console.log(`Calling paymentPlanHandler for subscription ${subscription.id} with status: ${status}`);
      
      const paymentPlanHandler = require('../UtilityFunctions/PostProcessingFunctions/PaymentPlan/paymentPlanHandler.js');
      
      // Create payload for paymentPlanHandler
      const postProcessPayload = {
        urdd_id: subscription.urdd_id,
        plan_id: subscription.plan_id,
        payment_method_id: paymentResult.payment_method_id || subscription.user_payment_method_id,
        payment_method: paymentResult.provider_name || 'stripe',
        gateway_response: paymentResult.gateway_response || {},
        transaction_id: paymentResult.transaction_id,
        payment_response: status // 'success' or 'failed'
      };
      
      // Call main paymentPlanHandler function
      console.log(`Calling paymentPlanHandler with payload:`, postProcessPayload);
      const result = await paymentPlanHandler({ body: postProcessPayload }, postProcessPayload);
      
      if (status === 'success') {
        console.log(`Successfully assigned permissions for subscription ${subscription.id}`);
        console.log(`   Result:`, result);
      } else if (status === 'failed') {
        console.log(`Successfully cleaned up permissions for subscription ${subscription.id}`);
        console.log(`   Result:`, result);
      }
      
    } catch (error) {
      console.error(`Error calling paymentPlanHandler for subscription ${subscription.id}:`, error);
      throw error;
    }
  }

  async updateSubscriptionExpiry(subscription) {
    try {
      const newExpiryDate = this.calculateNewExpiryDate(subscription);
      const newStartDate = new Date();
      
      const query = `
        UPDATE application_subscriptions 
        SET start_date = ?, expiry_date = ?
        WHERE id = ?
      `;
      
      const connection = await projectDB();
      
      try {
        await executeQuery(query, [newStartDate, newExpiryDate, subscription.id], connection, false);
        console.log(`Subscription ${subscription.id} expiry updated to ${newExpiryDate}`);
      } finally {
        connection.end();
      }
      
    } catch (error) {
      console.error(`Error updating subscription ${subscription.id} expiry:`, error);
      throw error;
    }
  }

  async markSubscriptionAsExpired(subscription) {
    try {
      const updateQuery = `
        UPDATE application_subscriptions 
        SET status = 'expired'
        WHERE id = ?
      `;
      
      const connection = await projectDB();
      
      try {
        await executeQuery(updateQuery, [subscription.id], connection, false);
        console.log(`Marked subscription ${subscription.id} as expired`);
      } finally {
        if (connection) connection.end();
      }
      
    } catch (error) {
      console.error(`Error marking subscription ${subscription.id} as expired:`, error);
    }
  }

  calculateNewExpiryDate(subscription) {
    const currentExpiry = new Date(subscription.expiry_date);
    const durationType = subscription.duration_type;
    
    // Default duration values since duration_value column doesn't exist
    let durationValue = 1;
    
    switch (durationType) {
      case 'monthly':
        const newMonth = currentExpiry.getMonth() + durationValue;
        const newYear = currentExpiry.getFullYear() + Math.floor(newMonth / 12);
        const finalMonth = newMonth % 12;
        
        const newDate = new Date(newYear, finalMonth, currentExpiry.getDate());
        
        if (newDate.getMonth() !== finalMonth) {
          newDate.setDate(0);
        }
        
        return newDate;
        
      case 'yearly':
        return new Date(currentExpiry.setFullYear(currentExpiry.getFullYear() + durationValue));
        
      case 'custom':
        return new Date(currentExpiry.getTime() + (durationValue * 24 * 60 * 60 * 1000));
        
      default:
        return new Date(currentExpiry.getTime() + (30 * 24 * 60 * 60 * 1000));
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  stop() {
    console.log('Stopping auto-renewal cron job');
  }

  async debugDatabaseState() {
    console.log('Debug: Checking database state...');
    
    const connection = await projectDB();
    
    try {
      // Check basic subscriptions
      const basicQuery = `
        SELECT 
          s.id, s.urdd_id, s.plan_id, s.expiry_date, s.status, s.auto_renew,
          p.name as plan_name
        FROM application_subscriptions s
        INNER JOIN plans p ON s.plan_id = p.id
        WHERE s.status = 'active' AND s.auto_renew = 1
        ORDER BY s.expiry_date ASC
        LIMIT 10
      `;
      
      const basicResult = await executeQuery(basicQuery, [], connection, false);
      console.log(`Basic subscriptions found: ${basicResult.length}`);
      basicResult.forEach(sub => {
        console.log(`   ID ${sub.id}: ${sub.plan_name}, expires ${sub.expiry_date}, auto_renew: ${sub.auto_renew}`);
      });
      
      // Check grace period calculation
      if (basicResult.length > 0) {
        const testSub = basicResult[0];
        const graceQuery = `
          SELECT 
            NOW() as db_time,
            '${testSub.expiry_date}' as expiry_date,
            DATE_ADD('${testSub.expiry_date}', INTERVAL ${this.gracePeriodDays} DAY) as grace_period_end,
            DATEDIFF(DATE_ADD('${testSub.expiry_date}', INTERVAL ${this.gracePeriodDays} DAY), NOW()) as days_until_grace_end,
            CASE 
              WHEN DATE_ADD('${testSub.expiry_date}', INTERVAL ${this.gracePeriodDays} DAY) > NOW() THEN 'WITHIN_GRACE'
              ELSE 'BEYOND_GRACE'
            END as grace_status
        `;
        
        const graceResult = await executeQuery(graceQuery, [], connection, false);
        console.log('Grace period calculation for first subscription:');
        console.log('   Current time:', graceResult[0].db_time);
        console.log('   Expiry date:', graceResult[0].expiry_date);
        console.log('   Grace period ends:', graceResult[0].grace_period_end);
        console.log('   Days until grace end:', graceResult[0].days_until_grace_end);
        console.log('   Grace status:', graceResult[0].grace_status);
      }
      
      // Check JOIN issues
      const joinQuery = `
        SELECT 
          s.id, s.urdd_id, s.plan_id, s.user_payment_method_id,
          upm.id as upm_id, upm.is_default, upm.is_active, upm.is_verified,
          spm.id as spm_id, spm.name as payment_method_name
        FROM application_subscriptions s
        INNER JOIN plans p ON s.plan_id = p.id
        INNER JOIN user_payment_methods upm ON s.user_payment_method_id = upm.id
        INNER JOIN supported_payment_methods spm ON upm.supported_payment_method_id = spm.id
        WHERE s.status = 'active' AND s.auto_renew = 1
        LIMIT 5
      `;
      
      const joinResult = await executeQuery(joinQuery, [], connection, false);
      console.log(`JOIN test result: ${joinResult.length}`);
      joinResult.forEach(sub => {
        console.log(`   ID ${sub.id}: PM ${sub.payment_method_name}, default: ${sub.is_default}, active: ${sub.is_active}, verified: ${sub.is_verified}`);
      });
      
    } finally {
      connection.end();
    }
  }
}

module.exports = AutoRenewalCron;
