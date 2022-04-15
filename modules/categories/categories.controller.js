const requestValidation = require('./categories.requests.schemas');
const categoriesService = require('./categories.services');
const catchAsync = require('./../common/utils/catchAsync');

let validate, requestBody, serviceResult;

exports.getSingleItemController = catchAsync(async (req, res, next) => {
  serviceResult = await categoriesService.getSingleCategoria(req.params.id);

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
  serviceResult = await categoriesService.getCategories(req.params);
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
  validate = requestValidation.categoriesSchema.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      code: 400,
      message: ' bad request',
    });
  }

  serviceResult = await categoriesService.createCategorie(validate.value);

  if (serviceResult) {
    return res.status(200).json(serviceResult);
  }

  return res.status(200).json({
    code: 200,
  });
});
exports.putItemController = catchAsync(async (req, res, next) => {
  serviceResult = await categoriesService.putItemController(
    req.params.id,
    req.body
  );

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
exports.deleteItemController = catchAsync(async (req, res, next) => {
  serviceResult = await categoriesService.deleteItemController(req.params.id);

  if (serviceResult.code) {
    return res.status(serviceResult.code).json(serviceResult);
  }

  return res.status(204).json({
    code: 204,
  });
});
