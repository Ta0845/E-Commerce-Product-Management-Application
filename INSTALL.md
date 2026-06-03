# Installation & Setup Guide

## System Requirements

- **Operating System**: macOS, Windows, or Linux
- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher
- **MySQL**: v5.7 or higher
- **Git**: v2.0 or higher
- **RAM**: 2GB minimum
- **Disk Space**: 500MB minimum

## Step-by-Step Installation

### 1. Install Node.js and npm

#### macOS
```bash
# Using Homebrew
brew install node

# Verify installation
node --version
npm --version
```

#### Windows
- Download from https://nodejs.org/
- Run installer and follow prompts
- Verify: `node --version` and `npm --version`

#### Linux (Ubuntu)
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Install MySQL

#### macOS
```bash
# Using Homebrew
brew install mysql

# Start MySQL
brew services start mysql

# Login (default password is empty)
mysql -u root
```

#### Windows
- Download from https://dev.mysql.com/downloads/
- Run installer
- Choose setup type and configuration

#### Linux (Ubuntu)
```bash
sudo apt-get update
sudo apt-get install mysql-server

# Start service
sudo systemctl start mysql
```

### 3. Clone or Download Project

```bash
# Navigate to your projects folder
cd /path/to/projects

# Clone repository (if using Git)
git clone <repository-url>

# Or extract downloaded zip file
unzip E-Commerce-Product-Management-Application.zip

cd E-Commerce-Product-Management-Application
```

### 4. Database Setup

```bash
# Connect to MySQL
mysql -u root -p

# Password: (press Enter if no password)

# Run SQL schema
mysql> source database/schema.sql;

# Verify database created
mysql> USE ecommerce_db;
mysql> SHOW TABLES;

# Exit MySQL
mysql> exit;
```

### 5. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
touch .env

# Edit .env file with your credentials
# Example:
# PORT=5000
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=ecommerce_db
# JWT_SECRET=your_secret_key
# NODE_ENV=development

# Start development server
npm run dev

# You should see:
# "Server running on port 5000"
```

### 6. Frontend Setup

In a new terminal:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Frontend uses existing .env file
# REACT_APP_API_URL=http://localhost:5000/api

# Start development server
npm start

# Application opens at http://localhost:3000
```

## Verification

### Check Backend is Running
```bash
# In terminal
curl http://localhost:5000/api/health

# Response should be:
# {"message":"Server is running","status":"OK"}
```

### Check Frontend is Running
```bash
# Open browser
http://localhost:3000

# You should see the E-Shop home page
```

### Check Database
```bash
mysql -u root -p

mysql> USE ecommerce_db;
mysql> SELECT * FROM products;

# You should see 5 sample products
```

## File Permissions

If you encounter permission errors:

```bash
# macOS/Linux - Make files executable
chmod -R 755 backend/
chmod -R 755 frontend/
chmod -R 755 database/

# Windows - Run terminal as Administrator
```

## Troubleshooting Installation

### npm install fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### MySQL Connection Refused
```bash
# Start MySQL service
# macOS
brew services start mysql

# Windows - Use Services app or:
net start MySQL80

# Linux
sudo systemctl start mysql
```

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Find process using port 5000
lsof -i :5000

# Kill process
kill -9 <PID>
```

### Node Modules Issues
```bash
# Delete and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Environment Variable Issues
```bash
# Verify .env files exist
backend/.env
frontend/.env

# Check values in .env files
cat backend/.env
cat frontend/.env

# Restart servers after changing .env
```

## Development Workflow

### Daily Startup

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start

# Terminal 3 - (Optional) MySQL monitoring
mysql -u root -p
```

### Code Changes
- Frontend changes auto-reload
- Backend changes auto-reload with nodemon
- No manual restart needed

### Database Changes
```bash
# If schema changes needed
mysql -u root -p < database/schema.sql

# Restart backend after schema changes
```

## Production Deployment

### Build Frontend
```bash
cd frontend
npm run build

# Creates optimized build in build/ folder
```

### Prepare Backend
```bash
cd backend

# Set environment to production
export NODE_ENV=production

# Or in .env
NODE_ENV=production

# Run backend
npm start
```

### Deploy To Cloud

#### Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set DB_HOST=your_rds_host
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

#### AWS
- Use AWS Elastic Beanstalk for backend
- Use AWS Amplify for frontend
- Use AWS RDS for database

#### Vercel (Frontend)
```bash
npm install -g vercel

# Deploy
vercel
```

## System Maintenance

### Update Dependencies
```bash
# Check for updates
npm outdated

# Update packages
npm update

# Update specific package
npm install package_name@latest
```

### Clear Cache
```bash
# npm cache
npm cache clean --force

# Browser cache
Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
```

### Backup Database
```bash
mysqldump -u root -p ecommerce_db > backup.sql

# Restore
mysql -u root -p ecommerce_db < backup.sql
```

## Monitoring

### View Logs
```bash
# Backend logs
npm run dev  # Shows console output

# Frontend logs
npm start    # Shows console output

# Browser console
F12 or Right-click > Inspect > Console
```

### Database Performance
```bash
# Connect to MySQL
mysql -u root -p

# View queries
mysql> SHOW PROCESSLIST;

# View table stats
mysql> SHOW TABLE STATUS FROM ecommerce_db;
```

## Support Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)

## Next Steps

1. Complete installation
2. Follow Quick Start Guide
3. Read Backend and Frontend documentation
4. Start development!

## Getting Help

If you encounter issues:

1. Check error messages in terminal
2. Review troubleshooting section
3. Check logs and console
4. Verify environment variables
5. Verify ports are not in use
6. Review documentation files
