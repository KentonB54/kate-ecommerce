const { client } = require('../config/database');

async function getAllOrders() {
  try {
    const { rows: orders } = await client.query(`
      SELECT *
      FROM orders;
    `);

    return orders;
  } catch (error) {
    console.error('Error getting all orders', error);
    throw error;
  }
}

async function getOrderById(orderId) {
  try {
    const { rows: [order] } = await client.query(`
      SELECT *
      FROM orders
      WHERE id = $1;
    `, [orderId]);

    return order;
  } catch (error) {
    console.error('Error getting order by ID', error);
    throw error;
  }
}

async function createOrder({userId, shippingAddress, shippingMethod, trackingNumber, deliveryStatus}) {
  try {
    const { rows: [order] } = await client.query(`
      INSERT INTO orders (user_id, shipping_address, shipping_method, tracking_number, delivery_status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `, [userId, shippingAddress, shippingMethod, trackingNumber, deliveryStatus]);

    return order;
  } catch (error) {
    console.error('Error creating order', error);
    throw error;
  }
}

async function updateOrder(orderId, shippingAddress, shippingMethod, trackingNumber, deliveryStatus) {
  try {
    const { rows: [order] } = await client.query(`
      UPDATE orders
      SET shipping_address = $2, shipping_method = $3, tracking_number = $4, delivery_status = $5
      WHERE id = $1
      RETURNING *;
    `, [orderId, shippingAddress, shippingMethod, trackingNumber, deliveryStatus]);

    return order;
  } catch (error) {
    console.error('Error updating order', error);
    throw error;
  }
}

async function deleteOrder(orderId) {
  try {
    const { rows: [deletedOrder] } = await client.query(`
      DELETE FROM orders
      WHERE id = $1
      RETURNING *;
    `, [orderId]);

    return deletedOrder;
  } catch (error) {
    console.error('Error deleting order', error);
    throw error;
  }
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
