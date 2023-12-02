// ./config/config.js
require('dotenv').config(); // This line is optional if you have a .env file

const config = {
  mongoURI: process.env.MONGODB_URI, 
  port: process.env.PORT , 
  jwtSecret: process.env.JWT_SECRET, 
  contractAddress: process.env.CONTRACT_ADDRESS,
  alchemyApiKey: process.env.ALCHEMY_API_KEY,
  alchemyProviderURL: process.env.ALCHEMY_API_URL,  
  
};

module.exports = config;
