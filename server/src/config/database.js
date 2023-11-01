require("dotenv").config("../.env");
const { Client } = require("pg");

const client = new Client({
    connectionString: process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL,
  });

module.exports = {
    client,
}