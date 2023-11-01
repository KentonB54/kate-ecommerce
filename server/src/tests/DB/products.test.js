const { client } = require('../../config/database');
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
} = require('../../models');

xdescribe('DB products test', () => {
  beforeAll(async () => {
    await client.connect();
  });

  afterAll(async () => {
    await client.end();
  });

  describe('getAllProducts', () => {
    test('getAllProducts returns an array', async () => {
      const products = await getAllProducts();
      //console.log(products);
      expect(products).toBeInstanceOf(Array);
    });

    test('products is not an empty array', async () => {
      const products = await getAllProducts();
      // console.log(products)
      expect(products.length).toBeGreaterThan(0);
    });
  });

  describe('getProductById', () => {
    test('can get single product by id', async () => {
      const product = await getProductById(2);
      const expectedProduct = {
        id: 2,
        name: 'Product 2',
        description: 'Description for Product 2',
        price: 20,
        stock: 50,
        category_id: 2,
        image_urls: ['image3.jpg'],
      };
      // console.log(product)
      expect(product).toEqual(expectedProduct);
    });
  });

  describe('createProduct', () => {
    test('can create and add product', async () => {
      const productData = {
        name: 'my new product name',
        description: 'new description',
        price: 12,
        stock: 2,
        category_id: 1,
        image_urls: [
          'sadfasfdsf.com',
          'asdfkljasdflkjsdf.net',
          'asdfasdfkjsdf.com',
        ],
      };
      const newProduct = await createProduct({ ...productData });
      //console.log(newProduct)
      expect(newProduct).toBeInstanceOf(Object);
    });
  });

  describe('updateProduct', () => {
    test('can update product', async () => {
      const productData = {
        name: 'my updated product name',
        description: 'updated description',
        price: 12,
        stock: 2,
        category_id: 1,
        image_urls: [
          'sadfasfdsf.com',
          'asdfkljasdflkjsdf.net',
          'asdfasdfkjsdf.com',
        ],
      };
      const expectedData = {
        id: 1,
        ...productData,
      };

      const updatedProduct = await updateProduct(1, { ...productData });
      //console.log(updatedProduct);
      expect(updatedProduct).toEqual(expectedData);
    });
  });

  describe('deleteProduct', () => {
    test('can delete product', async () => {
      const deletedProduct = await deleteProduct(3);
      expect(deletedProduct).toBeInstanceOf(Object);
    });
  });
});
