# Frontend Application Documentation

## Overview

The E-Commerce frontend is a React-based single-page application that provides a modern, responsive user interface for browsing products, managing shopping carts, and processing orders.

## Getting Started

### Prerequisites
- Node.js v14+
- npm v6+

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file (already included)
# Edit if backend URL is different:
# REACT_APP_API_URL=http://localhost:5000/api

# Start development server
npm start

# Application opens at http://localhost:3000
```

## Environment Variables

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Project Structure

```
frontend/
├── src/
│   ├── components/              # Reusable components
│   │   ├── Navigation.js       # Header navigation
│   │   ├── Navigation.css
│   │   ├── ProductCard.js      # Product display card
│   │   └── ProductCard.css
│   │
│   ├── pages/                   # Page components
│   │   ├── HomePage.js         # Products listing
│   │   ├── HomePage.css
│   │   ├── ProductDetailsPage.js
│   │   ├── ProductDetailsPage.css
│   │   ├── SearchResultsPage.js
│   │   ├── SearchResultsPage.css
│   │   ├── CartPage.js         # Shopping cart
│   │   ├── CartPage.css
│   │   ├── OrderPage.js        # Order history
│   │   ├── OrderPage.css
│   │   ├── LoginPage.js        # User login
│   │   ├── LoginPage.css
│   │   ├── RegisterPage.js     # User registration
│   │   ├── RegisterPage.css
│   │   ├── ProfilePage.js      # User profile
│   │   └── ProfilePage.css
│   │
│   ├── context/                 # React Context
│   │   ├── AuthContext.js      # Authentication state
│   │   └── CartContext.js      # Shopping cart state
│   │
│   ├── services/                # API integration
│   │   └── api.js              # Axios instance & endpoints
│   │
│   ├── assets/                  # Images, fonts, etc
│   │
│   ├── App.js                   # Main component
│   ├── App.css
│   ├── index.js                 # React entry point
│   ├── index.css
│   │
│   └── public/
│       ├── index.html           # HTML template
│       └── favicon.ico
│
├── package.json                 # Dependencies
├── .env                         # Environment variables
├── .gitignore
└── README.md
```

## Key Technologies

- **React 18** - UI library
- **React Router 6** - Client-side routing
- **Bootstrap 5** - CSS framework
- **Axios** - HTTP client library
- **Context API** - State management

## Pages & Features

### Home Page (`/`)
- Display all products in grid layout
- Product cards with price, stock status
- Quick add to cart buttons
- Featured products section

### Product Details (`/product/:id`)
- Full product information
- High-resolution product image
- Detailed description
- Stock availability
- Quantity selector
- Add to cart functionality

### Search (`/search?query=term`)
- Search products by name or description
- Display matching results
- Real-time search
- Filter and sort options

### Shopping Cart (`/cart`)
- View all cart items
- Modify quantities
- Remove items
- Cart summary with total
- Checkout button
- Continue shopping link

### Orders (`/orders`)
- View order history
- Order ID and date
- Total amount
- Order status (pending, processing, shipped, delivered)
- Order details link

### Login (`/login`)
- Email and password login
- Form validation
- Error messages
- Link to registration page
- Remember me functionality

### Register (`/register`)
- User registration form
- Email validation
- Password confirmation
- Password strength indicator
- Link to login page

### Profile (`/profile`)
- User information display
- Member since date
- Edit profile option
- Quick links to orders and cart

## Component Details

### Navigation Component
- Logo and brand name
- Search bar with live search
- Cart icon with item count
- User authentication links
- Responsive mobile menu

### ProductCard Component
- Product image/placeholder
- Product name and description
- Price display
- Stock status
- Add to cart button
- View details link
- Hover animations

## Context API

### AuthContext
```javascript
{
  user: { id, email, name } | null,
  setUser: (user) => void
}
```
Manages user authentication state and persists to localStorage.

### CartContext
```javascript
{
  cart: Array,
  setCart: (cart) => void,
  addToCart: (item) => void,
  removeFromCart: (itemId) => void,
  clearCart: () => void
}
```
Manages shopping cart state across the application.

## API Integration

The `api.js` service provides:

### Products API
```javascript
apiService.getAllProducts()
apiService.getProductById(id)
apiService.searchProducts(query)
apiService.createProduct(data, token)
```

### Users API
```javascript
apiService.registerUser(data)
apiService.loginUser(data)
apiService.getUserProfile(token)
```

### Cart API
```javascript
apiService.getCart(token)
apiService.addToCart(data, token)
apiService.removeFromCart(productId, token)
apiService.clearCart(token)
```

### Orders API
```javascript
apiService.createOrder(data, token)
apiService.getUserOrders(token)
apiService.getOrderDetails(orderId, token)
```

## Routing

Routes are defined in `App.js`:

```
/                    -> HomePage
/product/:id         -> ProductDetailsPage
/search              -> SearchResultsPage
/cart                -> CartPage
/orders              -> OrderPage
/login               -> LoginPage
/register            -> RegisterPage
/profile             -> ProfilePage
```

## Authentication Flow

1. **Register** - User creates new account
2. **Login** - User logs in with credentials
3. **Token Storage** - JWT token stored in localStorage
4. **API Requests** - Token included in Authorization header
5. **Protected Routes** - Routes check for valid token
6. **Logout** - Token removed from localStorage

## Styling

- **Bootstrap 5** - Grid system, components, utilities
- **Custom CSS** - Additional styling for components
- **CSS Variables** - Consistent color scheme
- **Responsive Design** - Mobile-first approach

### Color Scheme
- Primary: `#667eea` (Purple)
- Secondary: `#764ba2` (Dark Purple)
- Success: `#28a745` (Green)
- Danger: `#dc3545` (Red)
- Info: `#17a2b8` (Blue)
- Light: `#f5f5f5` (Light Gray)

## State Management

### Global State
- User authentication (AuthContext)
- Shopping cart (CartContext)

### Local State
- Form inputs
- Loading states
- Error messages
- Modal visibility

### Persistence
- User info stored in localStorage
- Cart stored in context

## Error Handling

- Try-catch blocks for API calls
- User-friendly error messages
- Error alerts and notifications
- Validation feedback

## Performance Optimization

- Code splitting with React.lazy()
- Lazy loading images
- Memoization of components
- Efficient state updates
- CSS minification

## Development

### Start Development Server
```bash
npm start
```
Opens http://localhost:3000

### Build for Production
```bash
npm run build
```
Creates optimized build in `build/` folder

### Run Tests
```bash
npm test
```

### Deploy
```bash
# Build production version
npm run build

# Deploy build folder to hosting service
# (Vercel, Netlify, AWS S3, etc.)
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### API Connection Issues
- Check backend is running on port 5000
- Verify REACT_APP_API_URL in .env
- Check browser console for CORS errors

### Authentication Issues
- Clear localStorage and try logging in again
- Check JWT token in DevTools > Application > LocalStorage
- Verify backend JWT_SECRET matches

### Styling Issues
- Clear browser cache (Ctrl+Shift+Delete)
- Rebuild CSS (npm start)
- Check Bootstrap version compatibility

## Future Enhancements

- Payment gateway integration
- Advanced filtering and sorting
- Product reviews and ratings
- Wish list functionality
- Order tracking with map
- Inventory management dashboard
- Analytics dashboard
- Mobile app (React Native)
