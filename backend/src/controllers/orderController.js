const pool = require('../config/database');

// Create order
exports.createOrder = async (req, res) => {
  try {
    const { userId } = req.user;
    const { items, total_amount, shipping_address } = req.body;
    const connection = await pool.getConnection();
    
    const [result] = await connection.query(
      'INSERT INTO orders (user_id, total_amount, shipping_address, status) VALUES (?, ?, ?, ?)',
      [userId, total_amount, shipping_address, 'pending']
    );
    
    const orderId = result.insertId;
    
    for (const item of items) {
      await connection.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.product_id, item.quantity, item.price]
      );
    }
    
    await connection.query('DELETE FROM cart WHERE user_id = ?', [userId]);
    
    connection.release();
    res.status(201).json({ message: 'Order created successfully', orderId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.user;
    const connection = await pool.getConnection();
    const [orders] = await connection.query(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    connection.release();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get order details
exports.getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { userId } = req.user;
    const connection = await pool.getConnection();
    
    const [orders] = await connection.query(
      'SELECT * FROM orders WHERE id = ? AND user_id = ?',
      [orderId, userId]
    );
    
    if (orders.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Order not found' });
    }
    
    const [items] = await connection.query(
      `SELECT oi.*, p.name, p.description FROM order_items oi 
       JOIN products p ON oi.product_id = p.id 
       WHERE oi.order_id = ?`,
      [orderId]
    );
    
    connection.release();
    res.json({ order: orders[0], items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
