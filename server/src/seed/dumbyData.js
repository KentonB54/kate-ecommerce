// Dummy data for users table
const usersData = [
    {
      Firebase_UID: 'user1uid',
      username: 'user1',
      is_admin: false,
    },
    {
      Firebase_UID: 'user2uid',
      username: 'user2',
      is_admin: true,
    },
    // Add more user data as needed
  ];
  
  // Dummy data for categories table
  const categoriesData = [
    {
      name: 'Category 1',
    },
    {
      name: 'Category 2',
    },
    // Add more category data as needed
  ];
  
  // Dummy data for products table
  const productsData = [
    {
      name: 'Product 1',
      description: 'Description for Product 1',
      price: 10,
      stock: 100,
      category_id: 1, // Category 1
      image_urls: ['image1.jpg', 'image2.jpg'],
    },
    {
      name: 'Product 2',
      description: 'Description for Product 2',
      price: 20,
      stock: 50,
      category_id: 2, // Category 2
      image_urls: ['image3.jpg'],
    },
    // Add more product data as needed
  ];
  
  // Dummy data for reviews table
  const reviewsData = [
    {
      product_id: 1, // Product 1
      user_id: 1, // User 1
      rating: 4,
      comment: 'Good product!',
    },
    {
      product_id: 2, // Product 2
      user_id: 2, // User 2
      rating: 5,
      comment: 'Excellent product!',
    },
    // Add more review data as needed
  ];
  
  // Dummy data for orders table
const ordersData = [
    {
      user_id: 1, // User 1
      shipping_address: '123 Main St, City, Country',
      shipping_method: 'Standard',
      tracking_number: 'TRK123456',
      delivery_status: 'Shipped',
    },
    {
      user_id: 2, // User 2
      shipping_address: '456 Elm St, Town, Country',
      shipping_method: 'Express',
      tracking_number: 'TRK789012',
      delivery_status: 'Delivered',
    },
    // Add more order data as needed
  ];
  
  // Dummy data for order_items table
  const orderItemsData = [
    {
      order_id: 1, // Order 1
      product_id: 1, // Product 1
      quantity: 2,
      total_price: 20,
    },
    {
      order_id: 2, // Order 2
      product_id: 2, // Product 2
      quantity: 3,
      total_price: 60,
    },
    // Add more order items data as needed
  ];
  
  // Dummy data for carts table
  const cartsData = [
    {
      user_id: 1, // User 1
    },
    {
      user_id: 2, // User 2
    },
    // Add more cart data as needed
  ];
  
  // Dummy data for cart_items table
  const cartItemsData = [
    {
      cart_id: 1, // Cart 1 (User 1's cart)
      product_id: 1, // Product 1
      quantity: 1,
    },
    {
      cart_id: 2, // Cart 2 (User 2's cart)
      product_id: 2, // Product 2
      quantity: 2,
    },
    // Add more cart items data as needed
  ];
  
  // Dummy data for payment table
  const paymentData = [
    {
      order_id: 1, // Payment for Order 1
      payment_method: 'Credit Card',
      amount: 20,
      status: 'Paid',
      transaction_id: 'TRANS123',
    },
    {
      order_id: 2, // Payment for Order 2
      payment_method: 'PayPal',
      amount: 60,
      status: 'Paid',
      transaction_id: 'TRANS456',
    },
    // Add more payment data as needed
  ];
  
  // Dummy data for sales_analytics table
  const salesAnalyticsData = [
    {
      date: '2023-01-15',
      product_id: 1, // Product 1
      quantity_sold: 10,
      total_revenue: 100,
      customer_id: 1, // User 1
    },
    {
      date: '2023-01-16',
      product_id: 2, // Product 2
      quantity_sold: 5,
      total_revenue: 150,
      customer_id: 2, // User 2
    },
    // Add more sales analytics data as needed
  ];
  
  module.exports = {
    usersData,
    categoriesData,
    productsData,
    reviewsData,
    ordersData,
    orderItemsData,
    cartsData,
    cartItemsData,
    paymentData,
    salesAnalyticsData
    // Export data for other tables as well
  };