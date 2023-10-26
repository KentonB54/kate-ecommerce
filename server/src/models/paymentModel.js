// paymentModel.js
const { client } = require('../config/database');

async function createPaymentIntent(orderId, paymentMethod, amount) {
  try {
    // Create a payment intent with Stripe API and get the intent ID
    // You can use the Stripe Node.js library to make this API call

    // Store payment intent details in your database
    const { rows: [payment] } = await client.query(`
      INSERT INTO payment (order_id, payment_method, amount, status)
      VALUES ($1, $2, $3, 'pending')
      RETURNING *;
    `, [orderId, paymentMethod, amount]);

    return payment;
  } catch (error) {
    console.error('Error creating payment intent', error);
    throw error;
  }
}

async function confirmPaymentIntent(paymentIntentId) {
  try {
    // Confirm a payment intent with Stripe API

    // Update the payment status in your database
    const { rows: [payment] } = await client.query(`
      UPDATE payment
      SET status = 'succeeded'
      WHERE id = $1
      RETURNING *;
    `, [paymentIntentId]);

    return payment;
  } catch (error) {
    console.error('Error confirming payment', error);
    throw error;
  }
}

async function handleWebhook(payload) {
  try {
    // Handle incoming webhook from Stripe
    // Verify the event is legitimate and process it accordingly
    // Update payment status and other relevant details in your database
    // You can use the Stripe Node.js library to verify and process webhooks

    // For example, if the payment was successful:
    // Update the payment status in your database
    await client.query(`
      UPDATE payment
      SET status = 'succeeded'
      WHERE stripe_event_id = $1;
    `, [payload.event.id]);

    // Handle other webhook events as needed

    return 'Webhook processed successfully';
  } catch (error) {
    console.error('Error handling webhook', error);
    throw error;
  }
}

async function retrievePaymentDetails(paymentId) {
  try {
    const { rows: [payment] } = await client.query(`
      SELECT *
      FROM payment
      WHERE id = $1;
    `, [paymentId]);

    return payment;
  } catch (error) {
    console.error('Error retrieving payment details', error);
    throw error;
  }
}

// Other payment-related functions

module.exports = {
  createPaymentIntent,
  confirmPaymentIntent,
  handleWebhook,
  retrievePaymentDetails,
  // Add other payment-related functions here
};
