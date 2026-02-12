const User = require("../model/user.model");

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

        const newUser = new User({ name, email, password });
        const result = await newUser.save();

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
            { new: true }
        );

        if (!result) {
            return res.status(404).send({ message: "User not updated" });
        }

        res.status(200).json(result);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching user" });
    }
}

const deleteUser = async (req, res) => {
    try {
        const result = await User.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).send({ message: "User not deleted" });
        }

        res.status(204).send("User successfully deleted");

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching user" });
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};