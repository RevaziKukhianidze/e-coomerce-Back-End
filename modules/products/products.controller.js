const requestValidation = require('./products.requests.schemas');
const productService = require('./products.services');
const catchAsync = require('./../common/utils/catchAsync');
const crypto = require('crypto');

let validate, serviceResult;

exports.getSingleItemController = catchAsync(async (req, res, next) => {
  serviceResult = await productService.getSingleProduct(req.params.id);
  if (serviceResult) {
    return res.status(200).json({
      status: 'success',
      data: {
        serviceResult,
      },
    });
  }

  return res.status(500).json({
    code: 500,
  });
});

exports.getItemsController = catchAsync(async (req, res, next) => {
  serviceResult = await productService.getProducts(req.params);
  if (serviceResult) {
    return res.status(200).json({
      status: 'success',
      results: serviceResult.length,
      data: {
        serviceResult,
      },
    });
  }
  return res.status(500).json({
    code: 500,
  });
});

exports.postItemController = catchAsync(async (req, res, next) => {
  // req.body.price = parseInt(req.body.price); // string to number
  validate = requestValidation.productsSchema.validate(req.body);
  console.log(validate);
  if (validate.error) {
    return res.status(400).json({
      code: 400,
      message: ' bad request',
    });
  }

  serviceResult = await productService.createProduct(validate.value);

  if (serviceResult) {
    return res.status(200).json(serviceResult);
  }

  return res.status(200).json({
    code: 200,
  });
});

exports.putItemController = catchAsync(async (req, res, next) => {
  serviceResult = await productService.updateProduct(req.params.id, req.body);

  if (serviceResult) {
    return res.status(200).json({
      status: 'success',
      data: {
        serviceResult,
      },
    });
  }

  return res.status(200).json({
    code: 200,
  });
});

exports.deleteItemController = catchAsync(async (req, res, next) => {
  serviceResult = await productService.deleteProduct(req.params.id);

  if (serviceResult.code) {
    return res.status(serviceResult.code).json(serviceResult);
  }

  return res.status(204).json({
    code: 204,
  });
});
