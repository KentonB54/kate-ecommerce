const { client } = require('../config/database');

async function getTotalSalesByCategory(categoryId) {
    try {
      const { rows } = await client.query(`
        SELECT SUM(total_price) AS total_sales
        FROM order_items
        JOIN products ON order_items.product_id = products.id
        WHERE products.category_id = $1;
      `, [categoryId]);
  
      return rows[0].total_sales || 0;
    } catch (error) {
      console.error('Error retrieving total sales by category', error);
      throw error;
    }
  }

  async function getTotalSalesByUser(userId) {
    try {
      const { rows } = await client.query(`
        SELECT SUM(total_price) AS total_sales
        FROM order_items
        WHERE user_id = $1;
      `, [userId]);
  
      return rows[0].total_sales || 0;
    } catch (error) {
      console.error('Error retrieving total sales by user', error);
      throw error;
    }
  }
  
  async function getTotalSalesAcrossProducts() {
    try {
      const { rows } = await client.query(`
        SELECT SUM(total_price) AS total_sales
        FROM order_items;
      `);
  
      return rows[0].total_sales || 0;
    } catch (error) {
      console.error('Error retrieving total sales across products', error);
      throw error;
    }
  }
  
module.exports = {
    getTotalSalesAcrossProducts,
    getTotalSalesByCategory,
    getTotalSalesByUser
};
