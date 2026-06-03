# Backend API Documentation

## Overview

The E-Commerce backend is built with Express.js and provides RESTful API endpoints for product management, user authentication, shopping cart, and order management.

## Getting Started

### Prerequisites
- Node.js v14+
- MySQL Server
- npm

### Installation

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with configuration
cp .env.example .env

# Edit .env with your database credentials
nano .env

# Start development server
npm run dev

# Or start production server
npm start
```

## Environment Variables

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ecommerce_db
DB_PORT=3306
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## Project Structure

```
src/
├── config/              # Configuration
│   └── database.js     # MySQL connection pool
├── controllers/         # Business logic
│   ├── productController.js
│   ├── userController.js
│   ├── cartController.js
│   └── orderController.js
├── routes/              # API routes
│   ├── products.js
│   ├── users.js
│   ├── cart.js
│   └── orders.js
├── middleware/          # Express middleware
│   └── auth.js         # JWT authentication
└── index.js            # Server entry point
```

## API Endpoints

### Products

#### Get All Products
```
GET /api/products
Response: Array of product objects
```

#### Get Product by ID
```
GET /api/products/:id
Response: Product object
```

#### Search Products
```
GET /api/products/search?query=keyword
Response: Array of matching products
```

#### Create Product (Admin)
```
POST /api/products
Headers: Authorization: Bearer <token>
Body: {
  name: string,
  description: string,
  price: number,
  stock: number,
  category: string
}
Response: { message: "Product created successfully" }
```

#### Update Product
```
PUT /api/products/:id
Headers: Authorization: Bearer <token>
Body: {
  name: string,
  description: string,
  price: number,
  stock: number,
  category: string
}
Response: { message: "Product updated successfully" }
```

#### Delete Product
```
DELETE /api/products/:id
Headers: Authorization: Bearer <token>
Response: { message: "Product deleted successfully" }
```

### Users

#### Register User
```
POST /api/users/register
Body: {
  email: string,
  password: string,
  name: string
}
Response: { message: "User registered successfully" }
```

#### Login User
```
POST /api/users/login
Body: {
  email: string,
  password: string
}
Response: {
  token: string,
  user: { id, email, name }
}
```

#### Get User Profile
```
GET /api/users/profile
Headers: Authorization: Bearer <token>
Response: User object with id, email, name, created_at
```

### Cart

#### Get Cart
```
GET /api/cart
Headers: Authorization: Bearer <token>
Response: Array of cart items with product details
```

#### Add to Cart
```
POST /api/cart
Headers: Authorization: Bearer <token>
Body: {
  productId: number,
  quantity: number
}
Response: { message: "Item added to cart" }
```

#### Remove from Cart
```
DELETE /api/cart/:productId
Headers: Authorization: Bearer <token>
Response: { message: "Item removed from cart" }
```

#### Clear Cart
```
DELETE /api/cart
Headers: Authorization: Bearer <token>
Response: { message: "Cart cleared" }
```

### Orders

#### Create Order
```
POST /api/orders
Headers: Authorization: Bearer <token>
Body: {
  items: Array<{ product_id, quantity, price }>,
  total_amount: number,
  shipping_address: string
}
Response: { message: "Order created successfully", orderId: number }
```

#### Get User Orders
```
GET /api/orders
Headers: Authorization: Bearer <token>
Response: Array of order objects
```

#### Get Order Details
```
GET /api/orders/:orderId
Headers: Authorization: Bearer <token>
Response: { order: Object, items: Array }
```

## Database Schema

### users
```sql
- id (INT PRIMARY KEY AUTO_INCREMENT)
- email (VARCHAR UNIQUE)
- password (VARCHAR)
- name (VARCHAR)
- created_at (TIMESTAMP)
```

### products
```sql
- id (INT PRIMARY KEY AUTO_INCREMENT)
- name (VARCHAR)
- description (TEXT)
- price (DECIMAL)
- stock (INT)
- category (VARCHAR)
- image_url (VARCHAR)
- created_at (TIMESTAMP)
```

### cart
```sql
- id (INT PRIMARY KEY AUTO_INCREMENT)
- user_id (INT FOREIGN KEY)
- product_id (INT FOREIGN KEY)
- quantity (INT)
- created_at (TIMESTAMP)
```

### orders
```sql
- id (INT PRIMARY KEY AUTO_INCREMENT)
- user_id (INT FOREIGN KEY)
- total_amount (DECIMAL)
- shipping_address (TEXT)
- status (ENUM: pending, processing, shipped, delivered, cancelled)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### order_items
```sql
- id (INT PRIMARY KEY AUTO_INCREMENT)
- order_id (INT FOREIGN KEY)
- product_id (INT FOREIGN KEY)
- quantity (INT)
- price (DECIMAL)
- created_at (TIMESTAMP)
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. User registers or logs in
2. Server returns JWT token
3. Client includes token in Authorization header for protected routes
4. Format: `Authorization: Bearer <token>`

Token expires in 24 hours.

## Error Handling

All errors return appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

Error Response Format:
```json
{
  "error": "Error message",
  "message": "Detailed error message"
}
```

## Development

### Start Development Server with Auto-Reload
```bash
npm run dev
```

### Run Tests
```bash
npm test
```

### Database Initialization
```bash
mysql -u root -p ecommerce_db < ../database/schema.sql
```

## Performance Considerations

- Database connection pooling is enabled
- JWT tokens are cached in-memory
- Passwords are hashed with bcryptjs (10 rounds)
- Database queries use prepared statements
- CORS is configured for frontend origin

## Security

- Passwords are hashed with bcryptjs
- JWT tokens for API authentication
- CORS headers configured
- Input validation on all endpoints
- SQL injection prevention via prepared statements

## Troubleshooting

### Database Connection Failed
- Check MySQL is running
- Verify .env database credentials
- Ensure database exists

### JWT Token Invalid
- Token may be expired (24h validity)
- Verify JWT_SECRET matches between login and subsequent requests
- Check Authorization header format

### CORS Errors
- Ensure frontend URL matches CORS configuration
- Check if proxy is configured correctly
