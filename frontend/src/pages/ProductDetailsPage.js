import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { apiService } from '../services/api';
import { CartContext } from '../context/CartContext';
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await apiService.getProductById(id);
      setProduct(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load product details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    alert(`${quantity} x ${product.name} added to cart!`);
    setQuantity(1);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {product && (
        <Row>
          <Col lg={6} className="mb-4">
            <div className="product-image-container">
              <div className="product-image-placeholder">
                📦
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <h1>{product.name}</h1>
            <p className="text-muted">{product.category}</p>
            <h3 className="text-primary my-3">${product.price}</h3>
            <p>{product.description}</p>
            <p className={`mb-3 ${product.stock > 0 ? 'text-success' : 'text-danger'}`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </p>
            <div className="quantity-selector mb-3">
              <label className="me-2">Quantity:</label>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="form-control d-inline-block"
                style={{ width: '100px' }}
              />
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-100"
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductDetailsPage;
