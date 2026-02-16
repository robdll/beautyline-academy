const { z } = require("zod");

const userSchema = z.object({
    name: z.string()
        .min(1, "Name is required")
        .max(100, "Name is too long")
        .trim()
        .transform(val => val.toLowerCase()),
    
    email: z.string()
        .email("Invalid email address")
        .trim()
        .toLowerCase(),
    
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
});

module.exports = {
    userSchema
};
