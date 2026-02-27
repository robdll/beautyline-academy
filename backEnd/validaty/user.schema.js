const { z } = require("zod");

const userSchema = z.object({
    name: z.string()
        .min(1, "Nome e cognome sono obbligatori")
        .max(100, "Nome e cognome sono troppo lunghi")
        .trim()
        .transform(val => val.toLowerCase()),
    
    email: z.string()
        .email("Indirizzo email non valido")
        .trim()
        .toLowerCase(),
    
    password: z.string()
        .min(8, "La password deve contenere almeno 8 caratteri")
});

const updateUserSchema = userSchema.partial();

module.exports = {
    userSchema,
    updateUserSchema
};
