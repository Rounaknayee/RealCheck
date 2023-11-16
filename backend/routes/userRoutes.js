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
    console.log(e);
    res.status(400).send(e);
  }
});

// Sign In

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ error: 'Login failed! User not found.' });
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).send({ error: 'Login failed! Incorrect password.' });
    }

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});
// router.post('/signin', async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.body.username });
//     if (!user || !(await user.comparePassword(req.body.password))) {
//       return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
//     }
//     const token = await user.generateAuthToken();
//     res.send({ user, token });
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });


// LogOut
router.post('/logout',auth, async (req, res) => {
  console.log('logout');
  console.log(req.user);
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    res.status(200).send('lsuccess')
  } catch (error) {
    res.status(500).send(error);
  }
});

// router.post('/api/logout',auth, async (req, res) => {
//   try {
//     req.user.tokens = req.user.tokens.filter((token) => {
//       return token.token !== req.token;
//     });
//     await req.user.save();
//     res.send();
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

module.exports = router;
