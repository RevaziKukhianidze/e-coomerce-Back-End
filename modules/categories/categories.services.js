const Categories = require('./entities/categories.model');

// Get Single Categorie
exports.getSingleCategoria = async (requestBody) => {
  const categorie = await Categories.findById(requestBody);
  return categorie;
};

// GET all  categories
exports.getCategories = async (requestBody) => {
  const categories = await Categories.find(requestBody);
  return categories;
};

//  Create categorie (POST)
exports.createCategorie = async (requestBody) => {
  const newCategorie = await Categories.create(requestBody);
  return newCategorie;
};

// update single categorie
exports.putItemController = async (requestId, requestBody) => {
  const updatedCategorie = await Categories.findByIdAndUpdate(
    requestId,
    {
      gender: requestBody.gender,
      clotheCategory: requestBody.clotheCategory,
      brand: requestBody.brand,
      color: requestBody.color,
      occassion: requestBody.occassion,
      materials: requestBody.materials,
    },
    {
      new: true,
      runValidators: true,
      // useFindAndModify: false,
    }
  );
  return updatedCategorie;
};

// delete categorie
exports.deleteItemController = async (requestBody) => {
  deleteCategorie = await Categories.findOneAndDelete(requestBody);
  return deleteCategorie;
};
