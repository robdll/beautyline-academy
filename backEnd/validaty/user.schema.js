const { z } = require("zod");

const userSchema = z.object({
    name: z.string()
        .min(1, "name is required")
        .max(255, "name is too long"),

    email: z.string()
        .email("Invalid email address")
        .max(255, "email is too long"),


    password: z.string()
        .min(1, "password is required")
        .max(255, "password is too long")
        .refine((password) => {
            if (password.length < 8) {
                return false;
            }
            return true;
        }, "password must be at least 8 characters long"),


});

module.exports = {
    userSchema
};
