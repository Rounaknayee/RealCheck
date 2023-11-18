const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  productId: { type: String, required: true, unique: true },
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Additional fields as per your requirement
  // ...
});

// Add a pre-save hook to generate a productId
productSchema.pre('save', function(next) {
    if (!this.productId) {
      const timestamp = Date.now();
      const randomSuffix = Math.floor(Math.random() * 10000); // Random 4-digit number
      this.productId = `RC-${timestamp}-${randomSuffix}`;
    }
    next();
  });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;