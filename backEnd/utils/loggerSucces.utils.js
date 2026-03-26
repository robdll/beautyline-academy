export const logUserCreated = (user, msg) => {
    logger.info(msg, {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    });
}

export const logUserUpdated = (user, msg) => {
    logger.info(msg, {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    });
}

export const logUserDeleted = (user, msg) => {
    logger.info(msg, {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    });
}

export const logUserFound = (user, msg) => {
    logger.info(msg, {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    });
}

export const userDeleted = (user, msg) => {
    logger.info(msg, {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    });
}

export const userLogin = (user, msg) => {
    logger.info(msg, {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    });
}

export const productCreated = (product, msg) => {
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

export const productUpdated = (product, msg) => {
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

export const productDeleted = (product, msg) => {
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

export const productFound = (product, msg) => {
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