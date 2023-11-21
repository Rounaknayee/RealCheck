// ./routes/userRoutes
const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {auth} = require('../middleware/auth'); // Import auth middleware and destructured auth function
const { Wallet } = require('ethers');
const router = new express.Router();
const axios = require('axios');

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
  //check first if user exists
  try {   
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    });
    const token = await user.generateAuthToken();
    console.log("User saved successfully");
    // Generate wallet address and private key
    const wallet = Wallet.createRandom();
    user.walletAddress = wallet.address;
    user.privateKey = wallet.privateKey;
    user.mnemonicPhrase = wallet.mnemonic.phrase;
    user.publicKey = wallet.publicKey;
    await user.save();
    console.log("Wallet saved successfully");
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
      return res.status(401).send({ error: 'Login failed! User not found' });
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).send({ error: 'Login failed! Incorrect Password' });
    }

    const token = await user.generateAuthToken();
    res.send({ user,  token }); 
  } catch (error) {
    res.status(400).send({error: error});
  }
});

/*
    Get user details
    GET /api/userdetails
*/
router.get('/userdetails', auth, async (req, res) => {
  try{
    email = req.user.email;
    walletAddress = req.user.walletAddress;
    const response = await axios.get(`https://sepolia-api.ethplorer.io/getAddressInfo/${walletAddress}?apiKey=freekey`);
    ethBalance = response.data.ETH.balance;
    res.status(200).send({email, walletAddress, ethBalance});
  }catch(error){
    res.status(401).send(error);
  }});

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
