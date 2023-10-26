// cartsModel.js
const { client } = require('../config/database');

async function getUserCart(userId) {
  try {
    const { rows: cartItems } = await client.query(`
      SELECT cart_items.*, products.name AS product_name, products.price AS product_price
      FROM cart_items
      JOIN products ON cart_items.product_id = products.product_id
      WHERE cart_items.user_id = $1;
    `, 
    [userId]
    );

    return cartItems;
  } catch (error) {
    console.error('Error getting user cart', error);
    throw error;
  }
}

async function addItemToCart(userId, productId, quantity, productPrice) {
    try {
      const { rows: [ cartItem ] } = await client.query(`
        INSERT INTO cart_items (user_id, product_id, quantity, total_price)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (user_id, product_id) DO UPDATE
        SET quantity = cart_items.quantity + $3
        RETURNING *;
      `, 
      [userId, productId, quantity, quantity * productPrice]
      ); 
  
      return cartItem;
    } catch (error) {
      console.error('Error adding item to cart', error);
      throw error;
    }
  }

  async function removeItemFromCart(cartItemId) {
    try {
      const { rows: [removedItem] } = await client.query(`
        DELETE FROM cart_items
        WHERE cart_item_id = $1
        RETURNING *;
      `, 
      [cartItemId]
      );
  
      return removedItem;
    } catch (error) {
      console.error('Error removing item from cart', error);
      throw error;
    }
  }

  async function updateCartItem(cartItemId, quantity) {
    try {
      const { rows: [updatedItem] } = await client.query(`
        UPDATE cart_items
        SET quantity = $2
        WHERE cart_item_id = $1
        RETURNING *;
      `, 
      [cartItemId, quantity]
      );
  
      return updatedItem;
    } catch (error) {
      console.error('Error updating cart item', error);
      throw error;
    }
  }

  async function clearCart(userId) {
    try {
      const { rows: clearedItems } = await client.query(`
        DELETE FROM cart_items
        WHERE user_id = $1
        RETURNING *;
      `, 
      [userId]
      );
  
      return clearedItems;
    } catch (error) {
      console.error('Error clearing cart', error);
      throw error;
    }
  }

  async function calculateCartTotal(userId) {
    try {
      const { rows: [cartTotal] } = await client.query(`
        SELECT SUM(cart_items.total_price) AS cart_total
        FROM cart_items
        WHERE cart_items.user_id = $1;
      `, [userId]);
  
      return cartTotal.cart_total || 0;
    } catch (error) {
      console.error('Error calculating cart total', error);
      throw error;
    }
  }

  async function getCartSize(userId) {
    try {
      const { rows: [cartSize] } = await client.query(`
        SELECT COUNT(*) AS cart_size
        FROM cart_items
        WHERE cart_items.user_id = $1;
      `, [userId]);
  
      return cartSize.cart_size || 0;
    } catch (error) {
      console.error('Error getting cart size', error);
      throw error;
    }
  }
  
  module.exports = {
    getUserCart,
    addItemToCart,
    removeItemFromCart,
    updateCartItem,
    clearCart,
    calculateCartTotal,
    getCartSize,
  };