import React, { useState, useEffect, useContext } from 'react';
import { Container, Table, Spinner, Alert, Badge } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { apiService } from '../services/api';
import './OrderPage.css';

const OrderPage = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await apiService.getUserOrders(token);
      setOrders(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load orders.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      processing: 'info',
      shipped: 'primary',
      delivered: 'success',
      cancelled: 'danger'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  if (!user) {
    return (
      <Container className="py-5 text-center">
        <h2>Please log in to view orders</h2>
        <a href="/login" className="btn btn-primary">Go to Login</a>
      </Container>
    );
  }

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

  if (orders.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h2>No Orders Yet</h2>
        <p className="text-muted">Start shopping to place your first order</p>
        <a href="/" className="btn btn-primary">Continue Shopping</a>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">My Orders</h2>

      <Table responsive className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{new Date(order.created_at).toLocaleDateString()}</td>
              <td>${order.total_amount}</td>
              <td>{getStatusBadge(order.status)}</td>
              <td>
                <a href={`/order/${order.id}`}>View</a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default OrderPage;
