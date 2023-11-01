const { client } = require('../config/database')

async function dropTables() {
    try {
      console.log('Starting to drop tables...');
     
      await client.query(`
        DROP TABLE IF EXISTS sales_analytics;
        DROP TABLE IF EXISTS payment;
        DROP TABLE IF EXISTS cart_items;
        DROP TABLE IF EXISTS order_items;
        DROP TABLE IF EXISTS reviews;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS carts;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS categories;
        DROP TABLE IF EXISTS users;
      `); 
  
      console.log('Finished dropping tables');
    } catch (error) {
      console.error('Error dropping tables:', error);
      throw error;
    }
  }
  

async function createTables() {
    try {
      console.log('Starting to build tables...');
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id serial PRIMARY KEY,
          fireBase_UID varchar,
          username varchar,
          is_admin boolean,
          created_at timestamp
        );
        CREATE TABLE IF NOT EXISTS categories (
          id serial PRIMARY KEY,
          name varchar,
          parent_id integer REFERENCES categories(id)
        );
        CREATE TABLE IF NOT EXISTS products (
          id serial PRIMARY KEY,
          name varchar,
          description text,
          price integer,
          stock integer,
          category_id integer REFERENCES categories(id),
          image_urls varchar[]
        );
        CREATE TABLE IF NOT EXISTS reviews (
          id serial PRIMARY KEY,
          product_id integer REFERENCES products(id),
          user_id integer REFERENCES users(id),
          rating integer,
          comment text,
          created_at timestamp DEFAULT NOW()
        );
        CREATE TABLE IF NOT EXISTS orders (
          id serial PRIMARY KEY,
          user_id integer REFERENCES users(id),
          created_at timestamp DEFAULT NOW(),
          shipping_address text,
          shipping_method varchar,
          tracking_number varchar,
          delivery_status varchar
        );
        CREATE TABLE IF NOT EXISTS order_items (
          id serial PRIMARY KEY,
          order_id integer REFERENCES orders(id),
          product_id integer REFERENCES products(id),
          quantity integer NOT NULL,
          total_price decimal(10, 2) NOT NULL
        );
        CREATE TABLE IF NOT EXISTS carts (
          id serial PRIMARY KEY,
          user_id integer REFERENCES users(id),
          created_at timestamp DEFAULT NOW()
        );
        CREATE TABLE IF NOT EXISTS cart_items (
          id serial PRIMARY KEY,
          cart_id integer REFERENCES carts(id),
          product_id integer REFERENCES products(id),
          quantity integer NOT NULL
        );
        CREATE TABLE IF NOT EXISTS payment (
          id serial PRIMARY KEY,
          order_id integer REFERENCES orders(id),
          payment_method varchar,
          amount integer,
          status varchar,
          transaction_id varchar,
          created_at timestamp DEFAULT NOW()
        );
        CREATE TABLE IF NOT EXISTS sales_analytics (
          id serial PRIMARY KEY,
          date date,
          product_id integer REFERENCES products(id),
          quantity_sold integer,
          total_revenue integer,
          customer_id integer REFERENCES users(id)
        );
      `);
      console.log('Tables built!');
    } catch (error) {
      console.error('Error with creating tables:', error);
    }
  }
  

module.exports = {
    createTables,
    dropTables
}