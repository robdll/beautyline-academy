const DUPLICATED_EMAIL_CODE = 11000;
const DUPLICATED_PRODUCT_CODE = 11000;

const ERROR_MESSAGES = {
    DUPLICATED_EMAIL: "Email already registered",
    INVALID_EMAIL: "Invalid email",
    INVALID_PASSWORD: "Invalid password",
    INVALID_NAME: "Invalid name",
    INVALID_ROLE: "Invalid role",
    INVALID_ID: "Invalid ID",
    USER_NOT_FOUND: "User not found",
    INTERNAL_SERVER_ERROR: "Internal server error",
    INVALID_USER_DATA: "Invalid user data",
    INVALID_CREDENTIALS: "Invalid credentials",
    INVALID_PRODUCT_DATA: "Invalid product data",
    DUPLICATED_PRODUCT: "Product already exists",
    PRODUCT_NOT_FOUND: "Product not found"
}

const SUCCESS_MESSAGES = {
    USER_CREATED: "User created successfully",
    USER_DELETED: "User deleted successfully",
    USER_UPDATED: "User updated successfully",
    USER_LOGGED_IN: "User logged in successfully",
    USER_FOUND: "User found successfully",
    PRODUCT_CREATED: "Product created successfully",
    PRODUCT_UPDATED: "Product updated successfully",
    PRODUCT_DELETED: "Product deleted successfully",
    PRODUCT_FOUND: "Product found successfully"
}
module.exports = {
    DUPLICATED_EMAIL_CODE,
    DUPLICATED_PRODUCT_CODE,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES
};
