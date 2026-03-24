const User = require("../model/userDB.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ERROR_MESSAGES, SUCCESS_MESSAGES } = require("../constants/message.constants");

const DUPLICATED_EMAIL_CODE = 11000;

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');

        if (users.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(users);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}


const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).send({ message: ERROR_MESSAGES.USER_NOT_FOUND });
        }


        res.status(200).json(user);


    } catch (err) {

        console.error(err);

        if (err.name === "CastError") {
            return res.status(400).json({ message: ERROR_MESSAGES.INVALID_ID });
        }

        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
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
                message: ERROR_MESSAGES.INVALID_USER_DATA,
                details: err.errors
            });
        }

        if (err.code === DUPLICATED_EMAIL_CODE) {
            return res.status(409).json({
                message: ERROR_MESSAGES.DUPLICATED_EMAIL
            });
        }

        console.error(err);
        return res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
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
            return res.status(404).send({ message: ERROR_MESSAGES.USER_NOT_FOUND });
        }

        res.status(200).json(result);

    } catch (err) {

        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: "Dati non validi",
                details: err.errors
            });
        }

        if (err.name === "CastError") {
            return res.status(400).json({ message: ERROR_MESSAGES.INVALID_ID });
        }

        if (err.code === DUPLICATED_EMAIL_CODE) {
            return res.status(409).json({
                message: ERROR_MESSAGES.DUPLICATED_EMAIL
            });
        }

        return res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}



const deleteUser = async (req, res) => {
    try {
        const result = await User.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).send({ message: ERROR_MESSAGES.USER_NOT_FOUND });
        }

        res.status(200).send(SUCCESS_MESSAGES.USER_DELETED);

    } catch (err) {
        if (err.name === "CastError") {
            return res.status(400).json({
                message: ERROR_MESSAGES.INVALID_ID
            });
        }
        console.error(err);
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });
        }

        const payload = {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role
        };

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            console.error("JWT_SECRET environment variable is not defined");
            return res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
        }

        const token = jwt.sign(payload, secret, { expiresIn: "1h" });

        res.status(200).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login
};
