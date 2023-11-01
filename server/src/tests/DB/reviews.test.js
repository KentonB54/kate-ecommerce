const { client } = require('../../config/database');
const {
  createReview,
  updateReview,
  deleteReview,
  getReviewsForProduct,
  getReviewsFromUserById,
} = require('../../models');

xdescribe('DB reviews tests', () => {
  beforeAll(async () => {
    await client.connect();
  });

  afterAll(async () => {
    await client.end();
  });

  describe('getReviewsFromUserById', () => {
    test('gets all reviews from user by id', async () => {
      const reviews = await getReviewsFromUserById(1);
      expect(reviews).toBeInstanceOf(Array);
    });
  });

  describe('getReviewsForProduct', () => {
    test('gets all reviews for a product by product id', async () => {
      const reviews = await getReviewsForProduct(2);
      expect(reviews).toBeInstanceOf(Array);
    });
  });

  describe('createReview', () => {
    test('user can create review', async () => {
      const reviewData = {
        product_id: 2,
        user_id: 1,
        rating: 4,
        comment: 'really cool piece',
      };
      const newReview = await createReview({ ...reviewData });
      expect(newReview.comment).toEqual('really cool piece');
    });
  });

  describe('updatedReview', () => {
    test('user can update review', async () => {
      const reviewData = {
        review_id: 5,
        rating: 3,
        comment: 'really awful piece',
      };
      const newReview = await updateReview({ ...reviewData });
      expect(newReview.comment).toEqual('really awful piece');
    });
  });

  describe('deleteReview', () => {
    test('user can delete own review', async () => {
      const deletedReview = await deleteReview(1);
      expect(deletedReview).toBeInstanceOf(Object);
    });
  });
});
