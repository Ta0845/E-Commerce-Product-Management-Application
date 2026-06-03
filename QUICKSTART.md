# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Setup Database (1 minute)

```bash
# Login to MySQL
mysql -u root -p

# Run the database schema
mysql> source /path/to/database/schema.sql;

# Or run directly from terminal
mysql -u root -p < database/schema.sql
```

### Step 2: Start Backend (1 minute)

```bash
# Terminal 1
cd backend

# Install dependencies
npm install

# Update .env with your database password
nano .env

# Start server
npm run dev

# Server running on http://localhost:5000
```

### Step 3: Start Frontend (1 minute)

```bash
# Terminal 2
cd frontend

# Install dependencies
npm install

# Start application
npm start

# App opens at http://localhost:3000
```

### Step 4: Test the Application (2 minutes)

1. **Register**: Go to http://localhost:3000/register
   - Create a test account
   
2. **Browse**: Go to http://localhost:3000
   - View all products
   - Search for products
   
3. **Shop**: 
   - Add items to cart
   - Go to /cart
   - Proceed to checkout
   
4. **Orders**: 
   - View your orders in /orders

## 📁 File Structure Summary

```
Your Project/
├── frontend/          # React app (Port 3000)
├── backend/           # Express API (Port 5000)
├── database/          # MySQL schema
└── README.md          # Full documentation
```

## 🔑 Key Ports

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MySQL**: localhost:3306

## 🔐 Default Login

After registration, use your email/password to login.

Sample products are pre-loaded in the database.

## 📝 Environment Files

### frontend/.env
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### backend/.env
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_db_password
DB_NAME=ecommerce_db
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

## ✅ Verification Checklist

- [ ] MySQL running and database created
- [ ] Backend dependencies installed
- [ ] Backend server running on port 5000
- [ ] Frontend dependencies installed
- [ ] Frontend app running on port 3000
- [ ] Can access http://localhost:3000
- [ ] Can register a new user
- [ ] Can login with credentials
- [ ] Can view products
- [ ] Can add to cart and checkout

## 🆘 Troubleshooting

### MySQL Connection Error
```bash
# Check MySQL is running
mysql -u root -p

# Verify credentials in backend/.env
# Make sure DB_PASSWORD matches your MySQL password
```

### Port Already in Use
```bash
# Kill process on port 3000 (Frontend)
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000 (Backend)
lsof -ti:5000 | xargs kill -9
```

### API Connection Error
- Verify backend is running: curl http://localhost:5000/api/health
- Check REACT_APP_API_URL in frontend/.env
- Clear browser cache and refresh

### Database Not Found
```bash
# Recreate database
mysql -u root -p < database/schema.sql
```

## 📚 Documentation

- [Backend API Documentation](backend/README.md)
- [Frontend Application Documentation](frontend/README.md)
- [Main Project README](README.md)

## 🎯 Next Steps

1. **Customize Products**: Add your own products in database
2. **Add Payment Gateway**: Integrate Stripe or PayPal
3. **Deploy**: Host on AWS, Heroku, Vercel, etc.
4. **Mobile App**: Convert to React Native
5. **Add Features**: Reviews, ratings, recommendations

## 💡 Tips

- Use VS Code for development
- Install Thunder Client or Postman for API testing
- Use MySQL Workbench to manage database
- Enable sourcemaps for debugging

Happy coding! 🎉
