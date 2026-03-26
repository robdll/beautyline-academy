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



