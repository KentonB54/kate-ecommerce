const { client } = require('../config/database'); 

const {
  categoriesData,
  productsData,
  usersData,
  reviewsData,
  ordersData,
  orderItemsData,
  cartsData,
  cartItemsData,
  paymentData,
  salesAnalyticsData,
} = require('./dumbyData');

async function insertDummyData() {
  try {
    // Insert data into the "users" table
    for (const user of usersData) {
      await client.query(`
        INSERT INTO users (Firebase_UID, username, is_admin, created_at)
        VALUES ($1, $2, $3, $4)
      `, [user.Firebase_UID, user.username, user.is_admin, new Date()]);
    }

    // Insert data into the "categories" table
    for (const category of categoriesData) {
      await client.query(`
        INSERT INTO categories (name, parent_id)
        VALUES ($1, $2)
      `, [category.name, category.parent_id]);
    }

    // Insert data into the "products" table
    for (const product of productsData) {
        await client.query(`
          INSERT INTO products (name, description, price, stock, category_id, image_urls)
          VALUES ($1, $2, $3, $4, $5, $6)
        `, [product.name, product.description, product.price, product.stock, product.category_id, product.image_urls]);
      }
  
      // Insert data into the "reviews" table
      for (const review of reviewsData) {
        await client.query(`
          INSERT INTO reviews (product_id, user_id, rating, comment, created_at)
          VALUES ($1, $2, $3, $4, $5)
        `, [review.product_id, review.user_id, review.rating, review.comment, new Date()]);
      }

      // Insert data into the "orders" table
    for (const order of ordersData) {
        await client.query(`
          INSERT INTO orders (user_id, created_at, shipping_address, shipping_method, tracking_number, delivery_status)
          VALUES ($1, $2, $3, $4, $5, $6)
        `, [order.user_id, new Date(), order.shipping_address, order.shipping_method, order.tracking_number, order.delivery_status]);
      }
  
      // Insert data into the "order_items" table
      for (const orderItem of orderItemsData) {
        await client.query(`
          INSERT INTO order_items (order_id, product_id, quantity, total_price)
          VALUES ($1, $2, $3, $4)
        `, [orderItem.order_id, orderItem.product_id, orderItem.quantity, orderItem.total_price]);
      }
  
      // Insert data into the "carts" table
      for (const cart of cartsData) {
        await client.query(`
          INSERT INTO carts (user_id, created_at)
          VALUES ($1, $2)
        `, [cart.user_id, new Date()]);
      }
  
      // Insert data into the "cart_items" table
      for (const cartItem of cartItemsData) {
        await client.query(`
          INSERT INTO cart_items (cart_id, product_id, quantity)
          VALUES ($1, $2, $3)
        `, [cartItem.cart_id, cartItem.product_id, cartItem.quantity]);
      }

      // Insert data into the "payment" table
    for (const payment of paymentData) {
        await client.query(`
          INSERT INTO payment (order_id, payment_method, amount, status, transaction_id, created_at)
          VALUES ($1, $2, $3, $4, $5, $6)
        `, [payment.order_id, payment.payment_method, payment.amount, payment.status, payment.transaction_id, new Date()]);
      }

      for (const analytics of salesAnalyticsData) {
        await client.query(`
          INSERT INTO sales_analytics (date, product_id, quantity_sold, total_revenue, customer_id)
          VALUES ($1, $2, $3, $4, $5)
        `, [analytics.date, analytics.product_id, analytics.quantity_sold, analytics.total_revenue, analytics.customer_id]);
      }

      console.log('Dummy data inserted successfully');
    // Create similar blocks for each table you want to populate.

  } catch (error) {
    console.error('Error inserting dummy data:', error);
  }
}

module.exports = { insertDummyData }