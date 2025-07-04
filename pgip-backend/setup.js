const fs = require('fs');
const path = require('path');

// Create .env file with MongoDB Atlas configuration
const envContent = `# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration (Using MongoDB Atlas Cloud)
MONGO_URI=mongodb+srv://namratasingh2308:namrata123@cluster0.7r44m.mongodb.net/pgip_db?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# Email Configuration (for future use)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
`;

try {
  fs.writeFileSync(path.join(__dirname, '.env'), envContent);
  console.log('✅ .env file created successfully!');
  console.log('🚀 Starting server...');
  
  // Start the server
  require('./server.js');
} catch (error) {
  console.error('Error creating .env file:', error);
} 