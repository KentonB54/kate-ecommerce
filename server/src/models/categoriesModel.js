const { client } = require('../config/database');

async function getAllCategories() {
  try {
    const { rows: categories } = await client.query(`
      SELECT *
      FROM categories;
    `);

    return categories;
  } catch (error) {
    console.error('Error getting all categories', error);
    throw error;
  }
}

async function getCategoryById(categoryId) {
  try {
    const { rows: [category] } = await client.query(`
      SELECT *
      FROM categories
      WHERE id = $1;
    `, [categoryId]);

    return category;
  } catch (error) {
    console.error('Error getting category by ID', error);
    throw error;
  }
}

async function createCategory(name, parentId) {
  try {
    const { rows: [category] } = await client.query(`
      INSERT INTO categories (name, parent_id)
      VALUES ($1, $2)
      RETURNING *;
    `, [name, parentId]);

    return category;
  } catch (error) {
    console.error('Error creating category', error);
    throw error;
  }
}

async function updateCategory(categoryId, name, parentId) {
  try {
    const { rows: [category] } = await client.query(`
      UPDATE categories
      SET name = $2, parent_id = $3
      WHERE id = $1
      RETURNING *;
    `, [categoryId, name, parentId]);

    return category;
  } catch (error) {
    console.error('Error updating category', error);
    throw error;
  }
}

async function deleteCategory(categoryId) {
  try {
    const { rows: [deletedCategory] } = await client.query(`
      DELETE FROM categories
      WHERE id = $1
      RETURNING *;
    `, [categoryId]);

    return deletedCategory;
  } catch (error) {
    console.error('Error deleting category', error);
    throw error;
  }
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};