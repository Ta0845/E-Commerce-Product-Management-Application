import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { apiService } from '../services/api';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <Card className="product-card h-100">
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className="text-muted text-truncate">
          {product.description}
        </Card.Text>
        <h5 className="text-primary">${product.price}</h5>
        <small className="text-muted">Stock: {product.stock}</small>
      </Card.Body>
      <Card.Footer className="bg-white">
        <Button
          variant="primary"
          size="sm"
          className="w-100"
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
        <Button
          variant="outline-secondary"
          size="sm"
          className="w-100 mt-2"
          href={`/product/${product.id}`}
        >
          View Details
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;
