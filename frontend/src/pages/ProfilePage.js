import React, { useState, useEffect, useContext } from 'react';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { apiService } from '../services/api';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await apiService.getUserProfile(token);
      setProfile(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load profile.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Container className="py-5 text-center">
        <h2>Please log in to view your profile</h2>
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

  return (
    <Container className="py-5">
      <h2 className="mb-4">My Profile</h2>

      {profile && (
        <Card className="profile-card">
          <Card.Body>
            <div className="profile-item">
              <h5>Name</h5>
              <p>{profile.name}</p>
            </div>
            <div className="profile-item">
              <h5>Email</h5>
              <p>{profile.email}</p>
            </div>
            <div className="profile-item">
              <h5>Member Since</h5>
              <p>{new Date(profile.created_at).toLocaleDateString()}</p>
            </div>
          </Card.Body>
        </Card>
      )}

      <div className="mt-4">
        <a href="/orders" className="btn btn-primary">View My Orders</a>
        <a href="/cart" className="btn btn-secondary ms-2">View Cart</a>
      </div>
    </Container>
  );
};

export default ProfilePage;
