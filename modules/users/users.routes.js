const express = require('express');
const router = express.Router();

const userController = require('./users.controller');
const authController = require('./../auth/auth.controller');

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getSingleItemController);
router.patch(
  '/updateme',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);

//after this middleware all routes can be use only by admin
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .post(userController.postItemController)
  .get(userController.getItemsController);

router
  .route('/:id')
  .get(userController.getSingleItemController)
  .put(userController.putItemController)
  .delete(userController.deleteItemController);

module.exports = router;
