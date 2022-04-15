const mongoose = require('mongoose');
const categories = require('./../../categories/entities/categories.model');

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product mast have a name'],
    maxlength: [
      40,
      'A product name must have less or equal then 40 characters',
    ],
    minlength: [1, 'A product name must have more or equal then 10 characters'],
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price'],
  },
  discountedPrice: {
    type: Number,
  },
  discountedPercent: {
    type: Number,
  },
  photo: {
    type: String,
  },
  viewCount: {
    type: Number,
    required: true,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  categories: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Categories',
      required: [false, 'product must have a category'],
    },
    {
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    },
  ],
});

productsSchema.methods.viewCountNumber = async function () {
  const counter = await req.params.viewCount;
  if (counter) {
    console.log(counter);
    counter += 1;

    return counter;
  }
};

const Product = mongoose.model('product', productsSchema);

module.exports = Product;
