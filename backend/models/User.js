const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['manufacturer', 'supplier'], required: true },
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
    console.log("Token generated and saved successfully");
    return token;
  } catch (error) {
    console.error("Error in generateAuthToken:", error);
    throw error;
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
