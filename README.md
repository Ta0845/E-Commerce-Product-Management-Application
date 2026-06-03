# E-Commerce Product Management Application

A full-stack e-commerce application built with React, Node.js/Express, and MySQL. This application features product catalog management, shopping cart, user authentication, and order management.

## 📁 Project Structure

```
E-Commerce-Product-Management-Application/
├── frontend/                          # React frontend application
│   ├── src/
│   │   ├── components/               # Reusable React components
│   │   │   ├── Navigation.js         # Main navigation bar
│   │   │   └── ProductCard.js        # Product card component
│   │   ├── pages/                    # Page components
│   │   │   ├── HomePage.js           # Home page
│   │   │   ├── ProductDetailsPage.js # Product details
│   │   │   ├── SearchResultsPage.js  # Search results
│   │   │   ├── CartPage.js          # Shopping cart
│   │   │   ├── OrderPage.js         # Order history
│   │   │   ├── LoginPage.js         # Login page
│   │   │   ├── RegisterPage.js      # Registration page
│   │   │   └── ProfilePage.js       # User profile
│   │   ├── context/                  # React context
│   │   │   ├── AuthContext.js       # Authentication context
│   │   │   └── CartContext.js       # Shopping cart context
│   │   ├── services/                 # API services
│   │   │   └── api.js               # API integration layer
│   │   ├── App.js                    # Main App component
│   │   ├── index.js                  # React entry point
│   │   └── index.html                # HTML template
│   ├── package.json                  # Frontend dependencies
│   ├── .env                          # Environment variables
│   ├── .gitignore
│   └── README.md                     # Frontend documentation
│
├── backend/                           # Node.js/Express backend
│   ├── src/
│   │   ├── config/                   # Configuration files
│   │   │   └── database.js          # MySQL database connection
│   │   ├── controllers/              # Request handlers
│   │   │   ├── productController.js # Product operations
│   │   │   ├── userController.js    # User auth operations
│   │   │   ├── cartController.js    # Cart operations
│   │   │   └── orderController.js   # Order operations
│   │   ├── routes/                   # API routes
│   │   │   ├── products.js          # Product routes
│   │   │   ├── users.js             # User routes
│   │   │   ├── cart.js              # Cart routes
│   │   │   └── orders.js            # Order routes
│   │   ├── middleware/               # Middleware functions
│   │   │   └── auth.js              # JWT authentication
│   │   └── index.js                  # Server entry point
│   ├── package.json                  # Backend dependencies
│   ├── .env                          # Environment variables
│   ├── .gitignore
│   └── README.md                     # Backend documentation
│
├── database/                          # Database setup
│   └── schema.sql                    # MySQL database schema
│
└── README.md                          # Main project README

```

## 🚀 Features

- **Product Catalog Management**
  - View all products
  - Search products by name or description
  - Product details page
  - Stock management

- **User Authentication**
  - User registration and login
  - JWT token-based authentication
  - Password hashing with bcryptjs
  - User profile page

- **Shopping Cart**
  - Add/remove items from cart
  - Quantity management
  - Cart persistence
  - View cart summary

- **Order Management**
  - Place orders
  - View order history
  - Order details and status tracking
  - Order items list

- **Responsive UI**
  - Bootstrap 5 responsive design
  - Clean and intuitive interface
  - Mobile-friendly layout

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Bootstrap 5** - CSS framework
- **Axios** - HTTP client
- **Context API** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL 2** - Database driver
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **CORS** - Cross-origin support

### Database
- **MySQL** - Relational database

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MySQL Server (v5.7 or higher)

## ⚙️ Installation

### 1. Setup MySQL Database

```bash
# Open MySQL console and run:
mysql -u root -p < database/schema.sql
```

Or manually:
```sql
mysql> source database/schema.sql;
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit .env file and set:
# - DB_HOST=localhost
# - DB_USER=root
# - DB_PASSWORD=your_password
# - DB_NAME=ecommerce_db
# - JWT_SECRET=your_secret_key

# Start the server
npm run dev
```

Server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment variables
# .env file is already configured with:
# REACT_APP_API_URL=http://localhost:5000/api

# Start the application
npm start
```

Application will open on `http://localhost:3000`

## 📡 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/search?query=term` - Search products
- `POST /api/products` - Create product (auth required)
- `PUT /api/products/:id` - Update product (auth required)
- `DELETE /api/products/:id` - Delete product (auth required)

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (auth required)

### Cart
- `GET /api/cart` - Get user cart (auth required)
- `POST /api/cart` - Add to cart (auth required)
- `DELETE /api/cart/:productId` - Remove from cart (auth required)
- `DELETE /api/cart` - Clear cart (auth required)

### Orders
- `POST /api/orders` - Create order (auth required)
- `GET /api/orders` - Get user orders (auth required)
- `GET /api/orders/:orderId` - Get order details (auth required)

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. User registers with email and password
2. Password is hashed using bcryptjs
3. User logs in with credentials
4. Server returns JWT token
5. Client stores token in localStorage
6. Subsequent requests include token in Authorization header: `Bearer <token>`

## 📝 Sample Data

The database is seeded with sample products:

1. Wireless Headphones - $99.99
2. USB-C Cable - $19.99
3. Laptop Stand - $49.99
4. Phone Case - $29.99
5. Keyboard - $129.99

## 🧪 Testing

### Register a New User
1. Go to http://localhost:3000/register
2. Fill in the registration form
3. Click Register

### Login
1. Go to http://localhost:3000/login
2. Use your registered credentials
3. Click Login

### Browse Products
1. View the home page with all products
2. Click on a product for details
3. Use search to find products

### Shopping Cart
1. Click "Add to Cart" on any product
2. Go to Cart page
3. View cart items and total
4. Proceed to checkout (requires login)

### View Orders
1. Login with your account
2. Click "Orders" in navigation
3. View order history

## 🎨 Styling

The application uses:
- Bootstrap 5 for responsive grid and components
- Custom CSS for additional styling
- CSS variables for consistent theming
- Responsive design for mobile and desktop

## 🔧 Configuration

### Backend (.env)
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=ecommerce_db
DB_PORT=3306
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 📚 Additional Notes

- Frontend runs on port 3000
- Backend runs on port 5000
- MySQL runs on port 3306 (default)
- Make sure ports are not in use before starting
- Clear browser cache if styles don't update

## 🚀 Deployment

For production deployment:

1. **Backend**
   - Set `NODE_ENV=production`
   - Use environment variables for sensitive data
   - Deploy to services like Heroku, AWS, or DigitalOcean

2. **Frontend**
   - Run `npm run build`
   - Deploy build folder to services like Vercel, Netlify, or AWS S3

3. **Database**
   - Use managed MySQL services like AWS RDS or DigitalOcean Managed Database

## 📞 Support

For issues or questions, please refer to the documentation or create an issue in the repository.

## 📄 License

This project is open source and available under the MIT License.