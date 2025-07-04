# PGIP (Portal for Government Information and Programs) - Setup Guide

## 🚀 Quick Start

This guide will help you set up and run the complete PGIP application with React frontend and Node.js backend.

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Git

## 🗂️ Project Structure

```
Final Year Project/
├── frontend-react/          # React frontend application
├── pgip-backend/           # Node.js backend API
└── SETUP_GUIDE.md         # This file
```

## 🔧 Backend Setup

### 1. Navigate to Backend Directory
```bash
cd pgip-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the `pgip-backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/pgip_db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# Email Configuration (for future use)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### 4. Start MongoDB
If using local MongoDB:
```bash
# Start MongoDB service
mongod
```

Or use MongoDB Atlas (cloud):
- Sign up at https://www.mongodb.com/atlas
- Create a cluster
- Get your connection string
- Replace `MONGO_URI` in `.env` with your Atlas connection string

### 5. Seed Database (Optional)
Populate the database with sample data:
```bash
npm run seed
```

### 6. Start Backend Server
```bash
npm start
```

Backend will be running at: http://localhost:5000

## 🎨 Frontend Setup

### 1. Navigate to Frontend Directory
```bash
cd frontend-react
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Frontend Development Server
```bash
npm start
```

Frontend will be running at: http://localhost:3000

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Government Schemes
- `GET /api/schemes` - Get all schemes
- `GET /api/schemes/search` - Search schemes
- `GET /api/schemes/category/:category` - Get schemes by category
- `GET /api/schemes/:id` - Get scheme by ID
- `GET /api/schemes/personalized/recommendations` - Get personalized schemes (protected)

### Notifications
- `GET /api/notifications` - Get user notifications (protected)
- `PUT /api/notifications/:id/read` - Mark notification as read (protected)
- `PUT /api/notifications/read-all` - Mark all notifications as read (protected)

## 🧪 Testing the Application

### 1. Backend Health Check
Visit: http://localhost:5000/api/health

### 2. API Documentation
Visit: http://localhost:5000/api

### 3. Frontend Application
Visit: http://localhost:3000

## 👤 Sample User Accounts

After running the seed script, you can use these test accounts:

**Regular User:**
- Email: user@example.com
- Password: password123

**Admin User:**
- Email: admin@example.com
- Password: admin123

## 🔍 Viewing Database Records

### Option 1: MongoDB Compass (GUI)
1. Download MongoDB Compass
2. Connect to: `mongodb://localhost:27017/pgip_db`
3. Browse collections: users, schemes, notifications

### Option 2: MongoDB Atlas (Cloud)
1. Log into MongoDB Atlas
2. Navigate to your cluster
3. Click "Browse Collections"
4. View your database and collections

### Option 3: MongoDB CLI
```bash
# Connect to MongoDB
mongosh

# Switch to database
use pgip_db

# View collections
show collections

# View users
db.users.find()

# View schemes
db.schemes.find()

# View notifications
db.notifications.find()
```

### Option 4: API Endpoints
```bash
# Get all schemes (public)
curl http://localhost:5000/api/schemes

# Get user profile (requires authentication)
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:5000/api/auth/profile
```

## 🛠️ Development Workflow

### Running Both Servers
Open two terminal windows:

**Terminal 1 (Backend):**
```bash
cd pgip-backend
npm start
```

**Terminal 2 (Frontend):**
```bash
cd frontend-react
npm start
```

### Making Changes
1. Frontend changes will auto-reload at http://localhost:3000
2. Backend changes require server restart (Ctrl+C, then `npm start`)
3. Database changes are persistent

## 🐛 Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
- Ensure MongoDB is running
- Check your connection string in `.env`
- Verify network connectivity

**2. Port Already in Use**
- Change PORT in `.env` file
- Kill process using the port: `npx kill-port 5000`

**3. CORS Errors**
- Ensure frontend URL is correct in backend `.env`
- Check that proxy is set in frontend `package.json`

**4. JWT Token Issues**
- Clear browser localStorage
- Check JWT_SECRET in backend `.env`

### Debug Mode
Enable debug logging in backend:
```env
NODE_ENV=development
DEBUG=*
```

## 📱 Features

### For Unauthenticated Users
- Browse government schemes
- View scheme categories
- Search schemes
- Register/Login

### For Authenticated Users
- Personalized dashboard
- Recommended schemes based on profile
- User notifications
- Profile management
- Scheme bookmarks (future)

### Admin Features (Future)
- Manage schemes
- Send notifications
- User management
- Analytics dashboard

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Input validation
- CORS configuration

## 🚀 Deployment

### Backend Deployment
1. Set `NODE_ENV=production`
2. Use MongoDB Atlas for database
3. Set secure JWT_SECRET
4. Deploy to Heroku, Vercel, or AWS

### Frontend Deployment
1. Run `npm run build`
2. Deploy `build` folder to Netlify, Vercel, or AWS S3
3. Update API base URL for production

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation at `/api`
3. Check browser console for errors
4. Verify database connectivity

## 🎯 Next Steps

- [ ] Add email verification
- [ ] Implement scheme bookmarks
- [ ] Add admin dashboard
- [ ] Create mobile app
- [ ] Add analytics
- [ ] Implement real-time notifications
- [ ] Add file upload for documents
- [ ] Create API rate limiting

---

**Happy Coding! 🎉** 