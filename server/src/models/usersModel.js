const { client } = require('../config/database')

async function createUser(Firebase_UID, username, is_admin) {
    try {
      const { rows: [ user ] } = await client.query(
        `
        INSERT INTO users (Firebase_UID, username, is_admin, created_at)
        VALUES ($1, $2, $3, NOW())
        RETURNING *;
        `,
        [Firebase_UID, username, is_admin]
      );
      return user;
    } catch (error) {
      console.error('error with creating user', error)
    }
}

async function getAllUsers() {
    try {
      const { rows: users } = await client.query(`
      SELECT * 
      FROM users;
      `);

      return users;
    } catch (error) {
        console.error('error with getting all users', error)
    }
}

async function getUserById(userId) {
    try {
      const { rows: user } = await client.query(`
        SELECT * 
        FROM users 
        WHERE id = $1;
        `,
        [userId]
      );

      return user; 
    } catch (error) {
        console.error('error with getting all users', error)
    }
  }


  async function updateUser(userId, username, is_admin) {
    try {
      const { rows: [ user ] } = await client.query(
        `
        UPDATE users
        SET username = $2, is_admin = $3
        WHERE id = $1
        RETURNING *;
        `,
        [userId, username, is_admin]
      );

      return user; 
    } catch (error) {
        console.error('error with updating user', error)
    }
  }

  async function deleteUser(userId) {
    try {
      const { rows: user } = await client.query(`
      DELETE FROM users 
      WHERE id = $1 
      RETURNING *;
      `,
        [userId]
      );
      return user;
    } catch (error) {
        console.error('error with deleting user', error)
    }
  }

  module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
  };