const multer = require('multer');
const sharp = require('sharp');
const requestValidation = require('./users.requests.schemas');
const userService = require('./users.services');
const catchAsync = require('./../common/utils/catchAsync');
const AppError = require('./../common/utils/appError');
const User = require('./entities/users.model');
const filterObj = require('./../common/utils/filterObj');
const upload = require('./../common/middleware/multer');

let validate, serviceResult;

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
};

// finish photoUpload code

exports.getSingleItemController = catchAsync(async (req, res, next) => {
  serviceResult = await userService.getSingleUser(req.params.id);
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
  serviceResult = await userService.getUsers(req.params);
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
  validate = requestValidation.userSchema.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      code: 400,
      message: ' bad request',
    });
  }

  serviceResult = await userService.createUser(validate.value);

  return res.status(200).json({
    code: 200,
  });
});

exports.putItemController = catchAsync(async (req, res, next) => {
  serviceResult = await userService.updateUser(req.params.id, req.body);

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
  serviceResult = await userService.deleteUser(req.params.id);

  if (serviceResult.code) {
    return res.status(serviceResult.code).json(serviceResult);
  }

  return res.status(204).json({
    code: 204,
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

//update current user's data but not password (want to move to user.controller)
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password updates !', 400));
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.photo = req.file.filename;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});
