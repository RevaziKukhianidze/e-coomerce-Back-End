// require('../../config/config');
const express = require('express');
const router = express.Router();
const categoriesController = require('./categories.controller');

router
  .route('/')
  .post(categoriesController.postItemController)
  .get(categoriesController.getItemsController);

router
  .route('/:id')
  .get(categoriesController.getSingleItemController)
  .put(categoriesController.putItemController)
  .delete(categoriesController.deleteItemController);

module.exports = router;
