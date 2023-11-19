const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const ethers = require('ethers');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['manufacturer', 'supplier'], required: true },
  walletAddress: { type: String, required: false, unique: true },
  privateKey: { type: String, required: false, unique: true },
  mnemonicPhrase: { type: String, required: false },
  publicKey: { type: String, required: false, unique: true },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  if (this.isModified('email')) {
    const existingUser = await mongoose.models.User.findOne({ email: this.email });
    if (existingUser) {
      // return next(new Error('Email already exists.'));
      throw({ error: 'Email already exists.' });
    }
  }
  //  Generate wallet address, private key, mnemonic and mnemonic phrase
  try {
    const wallet = ethers.Wallet.createRandom();
    this.walletAddress = wallet.address;
    this.publicKey = wallet.publicKey;
    this.privateKey = wallet.privateKey;
    this.mnemonicPhrase = wallet.mnemonic.phrase;
  }catch (error) {
    console.error("Error in generateWallet:", error);
    throw {error: error};
  }
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAuthToken = async function () {
  try {
    console.log("Inside generateAuthToken");
    const user = this;
    // Initialize tokens as an empty array if it's undefined
     if (!user.tokens) {
      user.tokens = [];
    }
    const token = jwt.sign({ _id: user._id.toString() }, config.jwtSecret);
    // Assuming user.tokens is an array
    user.tokens = user.tokens.concat({ token });
    await user.save();
    console.log("Token generated successfully");
    return token;
  } catch (error) {
    console.error("Error in generateAuthToken:", error);
    throw error;
  }
};

const User = mongoose.model('User', userSchema);
module.exports = User;
