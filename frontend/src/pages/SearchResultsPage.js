import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { apiService } from '../services/api';
import ProductCard from '../components/ProductCard';
import './SearchResultsPage.css';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const query = searchParams.get('query');

  useEffect(() => {
    if (query) {
      searchProducts();
    }
  }, [query]);

  const searchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiService.searchProducts(query);
      setResults(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to search products.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4">Search Results for "{query}"</h2>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && results.length === 0 && (
        <Alert variant="info">No products found matching your search.</Alert>
      )}

      {!loading && !error && results.length > 0 && (
        <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
          {results.map((product) => (
            <Col key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default SearchResultsPage;
