const { client } = require('../config/database')
const { 
    dropTables,
    createTables
 } = require('./seed')


async function rebuildDB() {
	try {
		await client.connect();
		await dropTables();
		await createTables();
	} catch (error) {
		console.log("Error during rebuildDB");
		throw error;
	}
}

async function main() {
    try {
      await rebuildDB();
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      process.exit(0);
    }
  }

main()