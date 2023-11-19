// ./routes/userRoutes
const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {auth} = require('../middleware/auth'); // Import auth middleware and destructured auth function
const router = new express.Router();

/*
    Create a user
    POST /api/signup
    {
        "email": "abc@xyz.com"
        "password": "password",
        "role": "manufacturer"
    }
*/
router.post('/signup', async (req, res) => {
   try {
    // const user = new User(
    //   req.body
    //   );    
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    });
    const token = await user.generateAuthToken();
    console.log("User saved successfully");
    res.status(201).send({ user, token});    
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

/*
    Login a user
    POST /api/signin
    {
        "email": "abc@xyz.com"
        "password": "password"
    }
*/

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


/*
    Logout a user
    POST /api/logout
*/
router.post('/logout',auth, async (req, res) => {
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
module.exports = router;
