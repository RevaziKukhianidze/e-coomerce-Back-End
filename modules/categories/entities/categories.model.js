const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema(
  {
    gender: {
      type: String,
      enum: ['men', 'women', 'kid'],
      required: true,
    },
    clotheCategory: {
      type: String,
      enum: {
        values: ['shorts', 'pants', 'sweaters', 'jeans', 'swimwear'],
        message:
          'clothecategories is either: shorts, pants, sweaters, jeans, swimwear ',
      },
      required: [true, 'a clothe must have a clothe category'],
    },
    brand: {
      type: String,
      emun: {
        values: ['addidas', 'nike', 'lacosta', 'polo'],
        message: 'brand is either: addidas, nike, lacosta, polo ',
      },
      required: [true, 'a clothe must have a brand'],
    },
    color: {
      type: String,
      enum: {
        values: ['blue', 'black', 'white', 'red', 'green', 'brown', 'yellow'],
        message:
          'colors are either: blue, black, white, red, green, brown, yellow',
      },
      required: [false, 'a clothe must have a color'],
    },
    occassion: {
      type: String,
      enum: {
        values: ['casual', 'athletic', 'outdoor', 'office'],
        message: 'occassion is either: casual, athletic, outdoor, office ',
      },
      required: [false, 'a clothe must have a occassion type'],
    },
    materials: {
      type: String,
      enum: {
        values: ['cotton', 'nylon', 'silk', 'fleece'],
        message: 'value is either: cotton, polyester, nylon, silk ',
      },
      required: [false, 'a clothe must have a material'],
    },
  },
  {
    timestamps: true,
    collection: 'categories',
    versionKey: false,
  }
);
module.exports = mongoose.model('Categories', documentSchema);

// module.exports = MenClothing;
