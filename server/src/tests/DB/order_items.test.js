const { client } = require('../../config/database');
const {
  createOrderItem,
  getOrderItemsForOrder,
  updateOrderItem,
  deleteOrderItem,
} = require('../../models'); 

describe('DB order_items tests', () => {
  let createdOrderItemId; // Store the ID of the created order item for later tests

  beforeAll(async () => {
    await client.connect();
  });

  afterAll(async () => {
    await client.end();
  });

  describe('createOrderItem', () => {
    test('can create a new order item', async () => {
      const orderItemData = {
        product_id: 2, // Replace with a valid product ID
        quantity: 3,
        total_price: 25.00
      };

      const newOrderItem = await createOrderItem(orderItemData);
      createdOrderItemId = newOrderItem.id; // Store the ID for later testing
      console.log(newOrderItem)
      expect(newOrderItem).toBeInstanceOf(Object);
    });
  });

  describe('getOrderItemsForOrder', () => {
    test('can get order items for a specific order', async () => {
      const orderId = 1; // Replace with a valid order ID
        
      const orderItems = await getOrderItemsForOrder(orderId);
        console.log(orderItems)
      expect(orderItems).toBeInstanceOf(Array);
    });
  });

  describe('updateOrderItem', () => {
    test('can update an order item by ID', async () => {
      // Replace with valid order item ID and updated quantity
      const updatedOrderItemData = {
        orderItemId: 3, // Use the previously created order item ID
        quantity: 5, // Replace with the desired quantity
      };

      const updatedOrderItem = await updateOrderItem(updatedOrderItemData);
      console.log(updatedOrderItem)
      expect(updatedOrderItem).toBeInstanceOf(Object);
    });
  });

  describe('deleteOrderItem', () => {
    test('can delete an order item by ID', async () => {
      // Use the order item ID created in the 'createOrderItem' test
      const orderItemIdToDelete = 1;

      const deletedOrderItem = await deleteOrderItem(orderItemIdToDelete);

      expect(deletedOrderItem).toBeInstanceOf(Object);
    });
  });
});
