const { z } = require("zod");

const userSchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .max(255, "Name is too long"),
  
  email: z.string()
    .email("Invalid email address")
    .toLowerCase(),
  
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
});

const validateUser = (req, res, next) => {
  try {
    userSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.errors.map(e => ({
          path: e.path.join('.'),
          message: e.message
        }))
      });
    }
    next(error);
  }
};

module.exports = {
  userSchema,
  validateUser
};
