const logger = require("../config/logger");

const logUserCreated = (user, msg) => {
    logger.info(msg, {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    });
}

const logUserUpdated = (user, msg) => {
    logger.info(msg, {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    });
}

const logUserDeleted = (user, msg) => {
    logger.info(msg, {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    });
}

const logUserFound = (user, msg) => {
    logger.info(msg, {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    });
}

const logUsersFound = (users, msg) => {
    logger.info(msg, {
        count: users.length,
        users: users.map(u => ({ id: u._id, name: u.name, email: u.email }))
    });
}

const userDeleted = (user, msg) => {
    logger.info(msg, {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    });
}

const userLogin = (user, msg) => {
    logger.info(msg, {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    });
}

const productCreated = (product, msg) => {
    logger.info(msg, {
        id: product._id,
        name: product.name,
        price: product.price,
        category: product.category,
        stock: product.stock,
        image: product.image,
        description: product.description,
    });
}

const productUpdated = (product, msg) => {
    logger.info(msg, {
        id: product._id,
        name: product.name,
        price: product.price,
        category: product.category,
        stock: product.stock,
        image: product.image,
        description: product.description,
    });
}

const productDeleted = (product, msg) => {
    logger.info(msg, {
        id: product._id,
        name: product.name,
        price: product.price,
        category: product.category,
        stock: product.stock,
        image: product.image,
        description: product.description,
    });
}

const productFound = (product, msg) => {
    logger.info(msg, {
        id: product._id,
        name: product.name,
        price: product.price,
        category: product.category,
        stock: product.stock,
        image: product.image,
        description: product.description,
    });
}
const productsFound = (products, msg) => {
    logger.info(msg, {
        count: products.length,
        products: products.map(p => ({ id: p._id, name: p.name, price: p.price }))
    });
}

module.exports = {
    logUserCreated,
    logUserUpdated,
    logUserDeleted,
    logUserFound,
    logUsersFound,
    userDeleted,
    userLogin,
    productCreated,
    productUpdated,
    productDeleted,
    productFound,
    productsFound
};
