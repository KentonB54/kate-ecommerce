const { client } = require('../config/database');

async function createReview({product_id, user_id, rating, comment}) {
  try {
    const { rows: [newReview] } = await client.query(
      `
      INSERT INTO reviews (product_id, user_id, rating, comment)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `,
      [product_id, user_id, rating, comment]);
    return newReview;
  } catch (error) {
    console.error('Error creating review', error);
    throw error;
  }
}

async function updateReview({review_id, rating, comment}) {
  try {
    const { rows: [updatedReview] } = await client.query(
      `
      UPDATE reviews
      SET rating = $2, comment = $3
      WHERE id = $1
      RETURNING *;
      `,
      [review_id, rating, comment]
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
        SELECT reviews.id AS review_id, 
               reviews.product_id, 
               reviews.rating, 
               reviews.comment, 
               reviews.created_at AS review_created_at,
               users.username
        FROM reviews
        INNER JOIN users ON reviews.user_id = users.id
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
  

async function getReviewsFromUserById(user_id) {
    try {
    const { rows: userReviews } = await client.query(`
    SELECT *
    FROM reviews
    WHERE user_id = $1
    `,
    [user_id]
    )

    return userReviews
    } catch (error) {
    console.error("error with getting reviews from user", error)
    }
}

module.exports = {
  createReview,
  updateReview,
  deleteReview,
  getReviewsForProduct,
  getReviewsFromUserById
};
