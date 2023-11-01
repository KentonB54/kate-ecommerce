const { createTables, dropTables } = require('../../seed/seed');
const { insertDummyData } = require('../../seed/insertData')
const {client} = require('../../config/database') 
const setup = async () => {
  console.log("--- JEST SETUP ---");
  await client.connect()
  await dropTables();
  await createTables();
  await insertDummyData();
}

module.exports = setup;