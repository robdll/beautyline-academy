const User = require("../model/userDB.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ERROR_MESSAGES, SUCCESS_MESSAGES } = require("../constants/message.constants");
const logger = require("../config/logger");

const DUPLICATED_EMAIL_CODE = 11000;

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');

        if (users.length === 0) {
            return res.status(200).json([]);
            logger.info(SUCCESS_MESSAGES.USER_FOUND, {
                id: users._id,
                name: users.name,
                email: users.email,
                role: users.role,
            });
        }

        res.status(200).json(users);
        logger.info(SUCCESS_MESSAGES.USER_FOUND, {
            id: users._id,
            name: users.name,
            email: users.email,
            role: users.role
        });

    } catch (err) {
        logger.error(err);
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR, error: err.message });
    }
}


const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).send({ message: ERROR_MESSAGES.USER_NOT_FOUND, error: err.message });
            logger.error(ERROR_MESSAGES.USER_NOT_FOUND, { error: err.message });
        }


        res.status(200).json(user);
        logger.info(SUCCESS_MESSAGES.USER_FOUND, {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });


    } catch (err) {
        logger.error(err);

        if (err.name === "CastError") {
            return res.status(400).json({ message: ERROR_MESSAGES.INVALID_ID, error: err.message });
            logger.error(ERROR_MESSAGES.INVALID_ID, { error: err.message });
        }

        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR, error: err.message });
        logger.error(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, { error: err.message });
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
        logger.info(SUCCESS_MESSAGES.USER_CREATED, {
            id: userResponse._id,
            name: userResponse.name,
            email: userResponse.email,
            role: userResponse.role
        });

    } catch (err) {

        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: ERROR_MESSAGES.INVALID_USER_DATA,
                details: err.errors
            });
            logger.error(ERROR_MESSAGES.INVALID_USER_DATA, { error: err.message });
        }

        if (err.code === DUPLICATED_EMAIL_CODE) {
            return res.status(409).json({
                message: ERROR_MESSAGES.DUPLICATED_EMAIL
            });
            logger.error(ERROR_MESSAGES.DUPLICATED_EMAIL, { error: err.message });
        }

        logger.error(err);
        return res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR, error: err.message });
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
            return res.status(404).send({ message: ERROR_MESSAGES.USER_NOT_FOUND, error: err.message });
            logger.error(ERROR_MESSAGES.USER_NOT_FOUND, { error: err.message });
        }

        res.status(200).json(result);
        logger.info(SUCCESS_MESSAGES.USER_UPDATED, {
            id: result._id,
            name: result.name,
            email: result.email,
            role: result.role
        });

    } catch (err) {

        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: ERROR_MESSAGES.INVALID_USER_DATA,
                details: err.errors
            });
            logger.error(ERROR_MESSAGES.INVALID_USER_DATA, { error: err.message });
        }

        if (err.name === "CastError") {
            return res.status(400).json({ message: ERROR_MESSAGES.INVALID_ID, error: err.message });
            logger.error(ERROR_MESSAGES.INVALID_ID, { error: err.message });
        }

        if (err.code === DUPLICATED_EMAIL_CODE) {
            return res.status(409).json({
                message: ERROR_MESSAGES.DUPLICATED_EMAIL
            });
            logger.error(ERROR_MESSAGES.DUPLICATED_EMAIL, { error: err.message });
        }

        logger.error(err);
        return res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR, error: err.message });
    }
}



const deleteUser = async (req, res) => {
    try {
        const result = await User.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).send({ message: ERROR_MESSAGES.USER_NOT_FOUND, error: err.message });
            logger.error(ERROR_MESSAGES.USER_NOT_FOUND, { error: err.message });
        }

        res.status(200).send(SUCCESS_MESSAGES.USER_DELETED);
        logger.info(SUCCESS_MESSAGES.USER_DELETED, {
            id: result._id,
            name: result.name,
            email: result.email,
            role: result.role
        });

    } catch (err) {
        if (err.name === "CastError") {
            return res.status(400).json({
                message: ERROR_MESSAGES.INVALID_ID
            });
            logger.error(ERROR_MESSAGES.INVALID_ID, { error: err.message });
        }
        logger.error(err);
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR, error: err.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });
            logger.error(ERROR_MESSAGES.INVALID_CREDENTIALS, { error: err.message });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });
            logger.error(ERROR_MESSAGES.INVALID_CREDENTIALS, { error: err.message });
        }

        const payload = {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role
        };

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            logger.error("JWT_SECRET environment variable is not defined", { error: err.message });
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
        logger.info(SUCCESS_MESSAGES.USER_LOGGED_IN, {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });

    } catch (err) {
        logger.error(err);
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR, error: err.message });
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
