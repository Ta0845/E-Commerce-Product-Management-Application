import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { apiService } from '../services/api';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAllProducts();
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <Container>
          <h1 className="hero-title">Welcome to E-Shop</h1>
          <p className="hero-subtitle">Discover amazing products at great prices</p>
        </Container>
      </div>

      <Container className="py-5">
        <h2 className="mb-4">Featured Products</h2>
        
        {loading && (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && (
          <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
            {products.map((product) => (
              <Col key={product.id}>
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default HomePage;
