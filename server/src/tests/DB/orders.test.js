const { client } = require('../../config/database');
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require('../../models');

xdescribe('DB orders tests', () => {
  beforeAll(async () => {
    await client.connect();
  });

  afterAll(async () => {
    await client.end();
  });

  describe('getAllOrders', () => {
    test('can get all orders', async () => {
      const orders = await getAllOrders();
      console.log(orders);
      expect(orders).toBeInstanceOf(Array);
    });
  });

  describe('getOrderById', () => {
    test('can get order by id of 1', async () => {
      const order = await getOrderById(1);
      //console.log(order);
      expect(order.id).toEqual(1);
    });
  });

  describe('createOrder', () => {
    test('can create a new order', async () => {
      const newOrderData = {
        userId: 1, // Replace with a valid user ID
        shippingAddress: '1234 Main St, Some City',
        shippingMethod: 'Standard Shipping',
        trackingNumber: 'ABC123',
        deliveryStatus: 'In Progress',
      };

      const newOrder = await createOrder(newOrderData);
      // console.log(newOrder)
      expect(newOrder).toBeInstanceOf(Object);
    });
  });

  describe('updateOrder', () => {
    test('can update an order by id', async () => {
      // Replace with a valid order ID and updated order data
      const orderIdToUpdate = 1;
      const updatedOrderData = {
        shippingAddress: 'Updated Address',
        shippingMethod: 'Express Shipping',
        trackingNumber: 'XYZ789',
        deliveryStatus: 'Delivered',
      };

      const updatedOrder = await updateOrder(orderIdToUpdate, updatedOrderData);
      //console.log(updatedOrder);
      expect(updatedOrder).toBeInstanceOf(Object);
    });
  });

  describe('deleteOrder', () => {
    test('can delete an order by id', async () => {
      // Replace with a valid order ID
      const orderIdToDelete = 2;
      const deletedOrder = await deleteOrder(orderIdToDelete);
      console.log(deletedOrder);
      expect(deletedOrder).toBeInstanceOf(Object);
    });
  });
});
