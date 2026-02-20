const { z } = require("zod");

const loginSchema = z.object({
    email: z.string()
        .email("Invalid email address")
        .trim()
        .toLowerCase(),

    password: z.string()
        .min(8, "Password must be at least 8 characters long")
});

module.exports = {
    loginSchema
};

