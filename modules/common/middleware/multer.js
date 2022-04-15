const multer = require('multer');
const AppError = require('../utils/appError');

const fileStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images', 400), false);
  }
};

const upload = multer({
  storage: fileStorage,
  fileFilter: multerFilter,
});

module.exports = upload;
// 1. upload.single('photo');
// 2. upload.array('photo', 3);
// 3. upload.fields([
//    {name: 'images', maxCount: 1},
//    {name: 'photo', maxCount: 5}
// ]);
