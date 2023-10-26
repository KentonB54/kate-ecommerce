const { client } = require('../config/database');

async function createReview(productId, userId, rating, comment) {
  try {
    const { rows: [newReview] } = await client.query(
      `
      INSERT INTO reviews (product_id, user_id, rating, comment)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `,
      [productId, userId, rating, comment]
    );
    return newReview;
  } catch (error) {
    console.error('Error creating review', error);
    throw error;
  }
}

async function updateReview(reviewId, rating, comment) {
  try {
    const { rows: [updatedReview] } = await client.query(
      `
      UPDATE reviews
      SET rating = $2, comment = $3
      WHERE id = $1
      RETURNING *;
      `,
      [reviewId, rating, comment]
    );
    return updatedReview;
  } catch (error) {
    console.error('Error updating review', error);
    throw error;
  }
}

async function deleteReview(reviewId) {
  try {
    const { rows: [deletedReview] } = await client.query(
      `
      DELETE FROM reviews
      WHERE id = $1
      RETURNING *;
      `,
      [reviewId]
    );
    return deletedReview;
  } catch (error) {
    console.error('Error deleting review', error);
    throw error;
  }
}

async function getReviewsForProduct(productId) {
  try {
    const { rows: productReviews } = await client.query(
      `
      SELECT * FROM reviews
      WHERE product_id = $1;
      `,
      [productId]
    );
    return productReviews;
  } catch (error) {
    console.error('Error getting reviews for product', error);
    throw error;
  }
}

module.exports = {
  createReview,
  updateReview,
  deleteReview,
  getReviewsForProduct,
};
