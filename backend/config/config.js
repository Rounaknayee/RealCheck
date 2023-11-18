// ./config/config.js
require('dotenv').config(); // This line is optional if you have a .env file

const config = {
  mongoURI: process.env.MONGODB_URI, //|| 'mongodb+srv://admin:admin%40123456789@rccluster.z2zaprq.mongodb.net/pp',
  port: process.env.PORT , //|| 5001
  jwtSecret: process.env.JWT_SECRET, // || 'rounak-@-realcheck' // You can set a default value for development
};

module.exports = config;
