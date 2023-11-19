// middleware/auth.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

const auth = async (req, res, next) => { 
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token
    });

    if (!user) {
      throw new Error('User not found.');
    }
    req.user = user;
    req.token = token; 
    next();
  } catch (error) {
    console.log(error);
    console.log("error in auth");
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

// Middleware to check user role
const checkRole = (role) => (req, res, next) => {
  if (req.user && req.user.role === role) {
    next();
  } else {
    console.log("error in checkRole");
    res.status(403).send('Error: Access denied.');
  }
};

module.exports = {
  auth,
  checkRole
};
