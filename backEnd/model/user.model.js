const User = require("./userDB.model");

const getUsers = () => {
    return User.find();
};

const getUserById = (id) => {
    return User.findById(id);
};

const createUser = (userData) => {

    const newUser = new User(userData);
    return newUser.save();
};

const updateUser = (id, userData) => {

    return User.findByIdAndUpdate(id, userData, { new: true });
};

const deleteUser = (id) => {
    return User.findByIdAndDelete(id);
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
