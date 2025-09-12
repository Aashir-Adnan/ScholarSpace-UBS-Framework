# Auto-Renewal System Documentation

## Overview

The auto-renewal system is a comprehensive subscription management solution that handles both proactive renewal and graceful degradation of user permissions based on a configurable grace period.

## System Architecture

### Core Components

1. **AutoRenewalCron** (`scripts/autoRenewalCron.js`)
   - Main cron job scheduler
   - Runs every 30 minutes
   - Handles both grace period and cleanup logic

2. **PaymentMethodRouter** (`UtilityFunctions/PreProcessingFunctions/PaymentPlan/paymentMethodRouter.js`)
   - Routes payment requests to appropriate handlers
   - Supports both manual and gateway-managed auto-renewal

3. **Handlers**
   - `ManualAutoRenewalHandler.js` - For KuickPay/JazzCash
   - `GatewayHandler.js` - Abstract base for Stripe/PayPal
   - `StripeHandler.js` - Stripe-specific implementation

## Grace Period Logic

### Definition
- **Grace Period** = Expiry Date + 2 Days
- **Within Grace Period**: 0 to 2 days after expiry
- **Beyond Grace Period**: More than 2 days after expiry

### Flow Diagram

```
┌─ Within Grace Period (< Grace Period) ──────────────────────────────┐
│                                                                      │
│ 1. Go to PreProcess Handlers (Payment Processing)                   │
│ 2. If SUCCESS → PostProcess (Permissions) ✅                        │
│ 3. If FAILED → Stay in Grace Period Loop                           │
│    ├─ Wait for interval (30 minutes)                               │
│    ├─ Try again with handlers                                      │
│    └─ Keep retrying until grace period ends                         │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘

┌─ Beyond Grace Period (>= Grace Period) ────────────────────────────┐
│                                                                      │
│ 1. Grace period exceeded                                            │
│ 2. Still go through PreProcess (Payment Processing)                 │
│ 3. If SUCCESS → PostProcess (Permissions) ✅                        │
│ 4. If FAILED → PostProcess (Failed Payment Scenario) ❌            │
│    ├─ Unassign permissions                                          │
│    ├─ Mark subscription as expired                                  │
│    └─ No more retries (grace period exhausted)                      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

## Key Features

### 1. Continuous Monitoring
- **Frequency**: Every 30 minutes
- **No Duplicate Processing**: Each subscription handled once per cycle
- **Graceful Failures**: Continues processing other subscriptions if one fails

### 2. Smart Retry Logic
- **Within Grace Period**: Unlimited retries until success
- **Beyond Grace Period**: One final attempt, then cleanup
- **Payment Method Selection**: Automatically selects user's default payment method

### 3. Database Synchronization
- **Connection Management**: Proper create/close for each query
- **Transaction Safety**: Each operation is atomic
- **Status Updates**: Subscription states properly managed

## Database Schema Requirements

### Required Tables
- `application_subscriptions` - Subscription data
- `plans` - Plan information and duration
- `user_payment_methods` - User payment methods
- `supported_payment_methods` - Payment gateway configuration

### Required Fields
- `application_subscriptions.auto_renew` - Must be 1 for auto-renewal
- `user_payment_methods.is_default` - Must be 1 for default method
- `user_payment_methods.is_active` - Must be 1 for active method
- `user_payment_methods.is_verified` - Must be 1 for verified method

## Configuration

### Environment Variables
```bash
DB_HOST=127.0.0.1
DB_USER=root
DB_PW=your_password
DB_DATABASE=ai_credits
DB_PORT=3306
```

### Grace Period Configuration
```javascript
// In AutoRenewalCron constructor
this.gracePeriodDays = 2; // Configurable grace period
```

## Testing

### 1. Run Test Script
```bash
node scripts/testAutoRenewalSystem.js
```

### 2. Manual Testing
Visit: `http://localhost:3000/test-auto-renewal-now`

### 3. Monitor Console
Watch for detailed processing logs with emojis for easy identification.

## Expected Console Output

### Within Grace Period Processing
```
🔄 Step 1: Processing subscriptions within grace period...
🔄 Found 2 subscriptions within grace period
🔄 Processing subscription 18 (Basic Plan)
   User: 1, Expires: 2025-08-30 12:00:00
   Days until grace period ends: 1
🔄 Attempting payment processing for subscription 18
🔄 Payment result for subscription 18: success
✅ Successfully processed subscription 18
```

### Beyond Grace Period Processing
```
🧹 Step 2: Processing subscriptions beyond grace period...
🧹 Found 1 subscriptions beyond grace period
🧹 Processing expired subscription 20 (Enterprise Plan)
   User: 3, Expired: 2025-08-26 12:00:00
   Days since grace period ended: 1
🔄 Attempting payment processing for subscription 20
🔄 Payment result for subscription 20: failed
❌ Payment failed for expired subscription 20, processing failed scenario
🧹 Processing failed payment scenario for subscription 20
🧹 Calling permission cleanup for expired subscription 20
✅ Marked subscription 20 as expired
```

## Integration Points

### 1. Payment Processing
- Integrates with existing `paymentMethodRouter`
- Supports both manual and gateway-managed renewals
- Uses existing payment handlers

### 2. Permission Management
- **Success**: Calls existing post-process for permission assignment
- **Failure**: Calls existing post-process for permission cleanup
- Maintains consistency with manual payment flows

### 3. Database Updates
- Updates subscription expiry dates on successful renewal
- Marks subscriptions as expired when grace period exhausted
- Maintains audit trail of all operations

## Error Handling

### 1. Database Connection Errors
- Graceful fallback with connection cleanup
- Continues processing other subscriptions
- Detailed error logging

### 2. Payment Processing Errors
- Retry logic within grace period
- Fallback to cleanup when grace period exhausted
- Comprehensive error logging

### 3. Permission Cleanup Errors
- Continues processing other subscriptions
- Logs errors for manual intervention
- Maintains system stability

## Monitoring and Maintenance

### 1. Log Analysis
- Look for emoji patterns to identify processing stages
- Monitor retry patterns within grace period
- Track cleanup operations beyond grace period

### 2. Performance Monitoring
- Monitor cron job execution time
- Track database query performance
- Watch for connection pool exhaustion

### 3. Alerting
- Failed payment processing within grace period
- Grace period exhaustion events
- Database connection failures

## Troubleshooting

### Common Issues

1. **No Subscriptions Found**
   - Check `auto_renew = 1` flag
   - Verify default payment methods exist
   - Check grace period calculations

2. **Payment Processing Failures**
   - Verify payment method configuration
   - Check gateway connectivity
   - Review payment handler logs

3. **Permission Cleanup Issues**
   - Verify post-process integration
   - Check permission table structure
   - Review cleanup handler implementation

### Debug Commands

```sql
-- Check grace period calculations
SELECT 
  s.id,
  s.expiry_date,
  DATE_ADD(s.expiry_date, INTERVAL 2 DAY) as grace_period_end,
  NOW() as current_time,
  DATEDIFF(DATE_ADD(s.expiry_date, INTERVAL 2 DAY), NOW()) as days_until_grace_end
FROM application_subscriptions s
WHERE s.urdd_id IN (1, 2, 3)
ORDER BY s.expiry_date ASC;

-- Verify payment method configuration
SELECT 
  upm.urdd_id,
  upm.is_default,
  upm.is_active,
  upm.is_verified,
  spm.name as provider_name,
  spm.is_active as provider_active
FROM user_payment_methods upm
INNER JOIN supported_payment_methods spm ON upm.supported_payment_method_id = spm.id
WHERE upm.urdd_id IN (1, 2, 3);
```

## Future Enhancements

1. **Configurable Retry Intervals**
   - Different retry schedules for different payment methods
   - Exponential backoff for failed attempts

2. **Advanced Grace Period Logic**
   - Tiered grace periods based on plan type
   - User-specific grace period overrides

3. **Analytics and Reporting**
   - Success/failure rate tracking
   - Grace period utilization metrics
   - Payment method performance analysis

## Support

For technical support or questions about the auto-renewal system:
1. Check console logs for detailed error messages
2. Verify database configuration and connectivity
3. Test with the provided test scripts
4. Review this documentation for troubleshooting steps


