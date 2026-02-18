const User = require("../model/userDB.model");
const bcrypt = require("bcrypt");

let DUPLICATED_EMAIL_CODE = 11000;

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');

        if (users.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(users);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching users" });
    }
}


const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }


        res.status(200).json(user);


    } catch (err) {

      console.error(err);

      if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      res.status(500).json({ message: "Error fetching user" });
}


const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
       

        const savedUser = await newUser.save();
        const userResponse = await User.findById(savedUser._id)
        .select('-password');

        res.status(201).json(userResponse);

    } catch (err) {

        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid user data",
                details: err.errors
            });
        }

        if (DUPLICATED_EMAIL_CODE) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        console.error(err);
        return res.status(500).json({ message: "Error creating user" });
    }
}


const updateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const result = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true,
                context: "query",
            }

        ).select('-password');



        if (!result) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).json(result);

    } catch (err) {

        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid data",
                details: err.errors
            });
        }
    
        if (DUPLICATED_EMAIL_CODE) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }
    
        return res.status(500).json({ message: "Internal error" });
    }
}



const deleteUser = async (req, res) => {
    try {
        const result = await User.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send("User deleted successfully");

    } catch (err) {

        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid user data",
                details: err.errors
            });
        }

        if (DUPLICATED_EMAIL_CODE) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        console.error(err);
        res.status(500).json({ message: "Error deleting user" });
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
