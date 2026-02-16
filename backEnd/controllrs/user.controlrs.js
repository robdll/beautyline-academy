const User = require("../model/userDB.model");

const getUsers = async (req, res) => {
    try {
        const users = await User.find();

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
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).json(user);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching user" });
    }
}


const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const newUser = new User(
            { name, email, password },
            {

                new: true,
                runValidators: true,
                context: "query"

            });


        const result = await newUser.save();

        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid user data",
                details: err.errors
            });
        }

        if (err.code === 11000 || err.code === 11001) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }


        res.status(201).send(result);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error creating user" });
    }
}


const updateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;


        const result = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, password },
            {
                new: true,
                runValidators: true,
                context: "query"
            }
        );

        if (!result) {
            return res.status(404).send({ message: "User not updated" });
        }

        res.status(200).json(result);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating user" });
    }
}



const deleteUser = async (req, res) => {
    try {
        const result = await User.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).send({ message: "User not deleted" });
        }

        res.status(200).send("User deleted successfully");

    } catch (err) {
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