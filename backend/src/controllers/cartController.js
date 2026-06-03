const pool = require('../config/database');

// Get user cart
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const connection = await pool.getConnection();
    const [cartItems] = await connection.query(
      `SELECT c.*, p.name, p.price FROM cart c 
       JOIN products p ON c.product_id = p.id 
       WHERE c.user_id = ?`,
      [userId]
    );
    connection.release();
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const { productId, quantity } = req.body;
    const connection = await pool.getConnection();
    
    const [existing] = await connection.query(
      'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );
    
    if (existing.length > 0) {
      await connection.query(
        'UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?',
        [quantity, userId, productId]
      );
    } else {
      await connection.query(
        'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [userId, productId, quantity]
      );
    }
    
    connection.release();
    res.json({ message: 'Item added to cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const { productId } = req.params;
    const connection = await pool.getConnection();
    
    await connection.query(
      'DELETE FROM cart WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );
    
    connection.release();
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const connection = await pool.getConnection();
    
    await connection.query('DELETE FROM cart WHERE user_id = ?', [userId]);
    
    connection.release();
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
