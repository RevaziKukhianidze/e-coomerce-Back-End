const express = require('express');
const router = express.Router();
const authController = require('./../auth/auth.controller');
const productsController = require('./products.controller');
const uploadProductsPhoto = require('./../common/middleware/multer');

router
  .route('/')
  .get(productsController.getItemsController)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    productsController.postItemController
  );

router
  .route('/:id')
  .get(productsController.getSingleItemController)
  .put(productsController.putItemController)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    productsController.deleteItemController
  );

// router.route('/upload').post(uploadProductsPhoto.uploadPhoto);

module.exports = router;
