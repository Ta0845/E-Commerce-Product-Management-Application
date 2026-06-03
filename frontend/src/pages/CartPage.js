import React, { useState, useContext } from 'react';
import { Container, Row, Col, Table, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { apiService } from '../services/api';
import './CartPage.css';

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setIsProcessing(true);
      const token = localStorage.getItem('token');
      const orderData = {
        items: cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total_amount: totalAmount,
        shipping_address: '123 Main St, City, Country'
      };

      await apiService.createOrder(orderData, token);
      clearCart();
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      alert('Failed to place order. Please try again.');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h2>Your Cart is Empty</h2>
        <p className="text-muted">Start shopping to add items to your cart</p>
        <Button href="/" variant="primary">Continue Shopping</Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">Shopping Cart</h2>

      <Row>
        <Col lg={8}>
          <Table responsive className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>

        <Col lg={4}>
          <div className="cart-summary">
            <h4>Order Summary</h4>
            <hr />
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-4">
              <strong>Total:</strong>
              <strong>${totalAmount.toFixed(2)}</strong>
            </div>
            <Button
              variant="success"
              size="lg"
              className="w-100 mb-2"
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
            </Button>
            <Button
              variant="outline-secondary"
              className="w-100 mb-2"
              onClick={() => clearCart()}
            >
              Clear Cart
            </Button>
            <Button
              variant="outline-primary"
              className="w-100"
              href="/"
            >
              Continue Shopping
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
