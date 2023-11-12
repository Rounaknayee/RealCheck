// ./routes/userRoutes

const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {auth} = require('../middleware/auth'); // Import auth middleware and destructured auth function
const router = new express.Router();

// Sign Up
router.post('/signup', async (req, res) => {
   try {
    const user = new User(
      req.body
      );    
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token});
  } catch (e) {
    // console.log(e);
    res.status(400).send(e);
  }
});

// Sign In
router.post('/signin', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !(await user.comparePassword(req.body.password))) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
    }
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Log Out
router.post('/api/logout',auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
