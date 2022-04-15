const Product = require('./entities/products.model');
const uploadProductsPhoto = require('./../common/middleware/multer');

// GET all products
exports.getProducts = async (requestBody) => {
  const products = await Product.find(requestBody)
    .populate({
      path: 'categories',
      select: '-createdAt -updatedAt',
    })
    .limit();
  return products;
};

// GET single product
exports.getSingleProduct = async (requestBody) => {
  const product = await Product.findById(requestBody).populate({
    path: 'categories',
    select: '-createdAt -updatedAt',
  });

  return product;
};

//  Create product (POST)
exports.createProduct = async (requestBody) => {
  const newProduct = await Product.create(requestBody);
  return newProduct;
};

// Update product (Put)
exports.updateProduct = async (requestId, requestBody) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    requestId,
    {
      categories: requestBody.categories,
      name: requestBody.name,
      price: requestBody.price,
      discountedPrice: requestBody.discountedPrice,
      discountedPercent: requestBody.discountedPercent,
      image: requestBody.image,
    },
    {
      new: true,
      runValidators: true,
      // useFindAndModify: false,
    }
  );
  return updatedProduct;
};

// delete product
exports.deleteProduct = async (requestBody) => {
  deleteProduct = await Product.findOneAndDelete(requestBody);
  return deleteProduct;
};
