const { client } = require('../config/database');

async function createOrderItem({ order_id, product_id, quantity, total_price }) {
  try {
    const {
      rows: [newOrderItem]
    } = await client.query(
      `
      INSERT INTO order_items (order_id, product_id, quantity, total_price)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `,
      [order_id, product_id, quantity, total_price]
    );
    return newOrderItem;
  } catch (error) {
    console.error('Error creating order item', error);
    throw error;
  }
}

async function getOrderItemsForOrder(orderId) {
  try {
    const { rows: orderItems } = await client.query(
      `
      SELECT *
      FROM order_items
      WHERE order_id = $1;
      `,
      [orderId]
    );
    return orderItems;
  } catch (error) {
    console.error('Error getting order items for order', error);
    throw error;
  }
}

async function updateOrderItem({ orderItemId, quantity }) {
  try {
    const {
      rows: [updatedOrderItem]
    } = await client.query(
      `
      UPDATE order_items
      SET quantity = $2
      WHERE id = $1
      RETURNING *;
      `,
      [orderItemId, quantity]
    );
    return updatedOrderItem;
  } catch (error) {
    console.error('Error updating order item', error);
    throw error;
  }
}

async function deleteOrderItem(orderItemId) {
  try {
    const {
      rows: [deletedOrderItem]
    } = await client.query(
      `
      DELETE FROM order_items
      WHERE id = $1
      RETURNING *;
      `,
      [orderItemId]
    );
    return deletedOrderItem;
  } catch (error) {
    console.error('Error deleting order item', error);
    throw error;
  }
}

module.exports = {
  createOrderItem,
  getOrderItemsForOrder,
  updateOrderItem,
  deleteOrderItem,
};
