const pool = require('../config/database');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [products] = await connection.query('SELECT * FROM products');
    connection.release();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [product] = await connection.query('SELECT * FROM products WHERE id = ?', [id]);
    connection.release();
    if (product.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search products
exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    const connection = await pool.getConnection();
    const [products] = await connection.query(
      'SELECT * FROM products WHERE name LIKE ? OR description LIKE ?',
      [`%${query}%`, `%${query}%`]
    );
    connection.release();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create product (admin only)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO products (name, description, price, stock, category) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, stock, category]
    );
    connection.release();
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category } = req.body;
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category = ? WHERE id = ?',
      [name, description, price, stock, category, id]
    );
    connection.release();
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM products WHERE id = ?', [id]);
    connection.release();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
