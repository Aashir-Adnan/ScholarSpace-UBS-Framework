# Abstract Payment Method Layer Documentation

## Overview

The Abstract Payment Method Layer provides a generic interface for processing payments through different payment gateways (Stripe, KuickPay, JazzCash, etc.) while maintaining a consistent API structure.

## Architecture

```
User Request → Payment Method Router → Specific Gateway → Payment Response → Permission Assignment
```

## Components

### 1. Payment Method Router (`paymentMethodRouter.js`)
- **Location**: `UtilityFunctions/PreProcessingFunctions/PaymentPlan/paymentMethodRouter.js`
- **Purpose**: Routes payment requests to appropriate payment gateways
- **Function**: `paymentMethodRouter(req, decryptedPayload)`

### 2. Payment Gateways (Stub Implementation)
- **Stripe**: Credit card processing
- **KuickPay**: Pakistani payment gateway
- **JazzCash**: Mobile payment service
- **Extensible**: Easy to add new payment methods

### 3. Enhanced PaymentPlan Handler
- **Location**: `UtilityFunctions/PostProcessingFunctions/PaymentPlan/paymentPlanHandler.js`
- **Features**: Transaction logging, permission assignment, subscription updates

## API Usage

### Request Format
```json
{
  "urdd_id": 1,
  "plan_id": 2,
  "payment_method_id": 1,
  "payment_details": {
    "card_number": "4242424242424242",
    "expiry": "12/25",
    "cvv": "123"
  }
}
```

### Response Format
```json
{
  "success": true,
  "message": "Payment successful! Permissions have been assigned.",
  "urdd_id": 1,
  "payment_method": "Stripe",
  "transaction_id": "stripe_1234567890",
  "permission_groups_count": 4,
  "individual_permissions_count": 24,
  "redirect_url": "/dashboard"
}
```

## Database Structure

### Supported Payment Methods Table
```sql
CREATE TABLE supported_payment_methods (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  provider_details JSON,
  discount_id INT(11),
  supported_currencies JSON,
  is_active TINYINT(1) DEFAULT 1
);
```

### Transactions Table (Enhanced)
- Uses existing `gateway_response` JSON field for payment method data
- Logs complete payment information without table alterations

## Adding New Payment Methods

### 1. Add to Database
```sql
INSERT INTO supported_payment_methods (name, provider_details, supported_currencies, is_active) 
VALUES ('NewGateway', JSON_OBJECT('api_key', 'test_key'), JSON_ARRAY('USD'), 1);
```

### 2. Add Gateway Function
```javascript
// In paymentMethodRouter.js
async function processNewGatewayPayment(payload) {
  return {
    payment_response: 'success',
    transaction_id: `newgateway_${Date.now()}`,
    gateway_response: {
      gateway: 'newgateway',
      status: 'completed'
    }
  };
}

// Add to switch statement
case 'newgateway':
  return await processNewGatewayPayment(payload);
```

## Testing

### Run Sample Data
```sql
-- Execute the sample payment methods script
source Database/samplePaymentMethods.sql;
```

### Test the API
```bash
node scripts/testPaymentStubs.js
```

## Error Handling

### Common Errors
1. **Invalid Payment Method**: Payment method ID not found
2. **Gateway Failure**: Payment processing failed
3. **Validation Errors**: Missing required parameters

### Error Response Format
```json
{
  "success": false,
  "message": "Payment failed. No permissions assigned.",
  "urdd_id": 1,
  "payment_method": "Stripe",
  "transaction_id": "stripe_1234567890",
  "redirect_url": "/payment/failed"
}
```

## Security Features

- **Parameter Validation**: All inputs validated before processing
- **Payment Method Verification**: Only active payment methods accepted
- **Transaction Logging**: Complete audit trail of all payments
- **Error Handling**: Secure error messages without exposing internal details

## Future Enhancements

### Real Gateway Implementation
1. **Stripe**: Replace stub with actual Stripe SDK
2. **KuickPay**: Integrate with KuickPay API
3. **JazzCash**: Connect to JazzCash payment system

### Additional Features
1. **Webhook Handling**: Process payment confirmations
2. **Refund Processing**: Handle payment reversals
3. **Multi-Currency**: Support for different currencies
4. **Payment Plans**: Installment payment options

## Troubleshooting

### Common Issues
1. **Payment Method Not Found**: Check if payment method exists and is active
2. **Gateway Errors**: Verify payment details format
3. **Permission Assignment Failures**: Check plan_groups and permission_groups_permissions tables

### Debug Mode
Enable detailed logging by checking console output for:
- Payment method routing information
- Gateway processing details
- Transaction logging status
- Permission assignment progress

## Support

For issues or questions about the payment method layer:
1. Check console logs for detailed error information
2. Verify database connectivity and table structure
3. Ensure payment methods are properly configured
4. Test with sample data before production use
