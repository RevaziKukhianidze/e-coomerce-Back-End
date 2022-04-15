const User = require('./entities/users.model');

// get All users
exports.getUsers = async (requestBody) => {
  const users = await User.find(requestBody);
  return users;
};

// GET single user
exports.getSingleUser = async (requestBody) => {
  const user = await User.findById(requestBody);
  return user;
};

//  Create user (POST)
exports.createUser = async (requestBody) => {
  const newUser = await User.create(requestBody);
  return newUser;
};

// Update user (Put)
exports.updateUser = async (requestId, requestBody) => {
  const updateUser = await User.findByIdAndUpdate(
    requestId,
    {
      name: requestBody.name,
      surname: requestBody.surname,
      email: requestBody.email,
      password: requestBody.password,
      role: requestBody.role,
    },
    {
      new: true,
      runValidators: true,
      // useFindAndModify: false,
    }
  );
  return updateUser;
};

// delete User
exports.deleteUser = async (requestBody) => {
  deleteUser = await User.findOneAndDelete(requestBody);
  return deleteUser;
};
