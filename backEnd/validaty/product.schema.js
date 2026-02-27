const { z } = require("zod");
const productSchema = z.object({
    name: z.string({
        required_error: "O nome do produto é obrigatório",
        invalid_type_error: "O nome do produto é obrigatório"
    }).min(1, "O nome do produto é obrigatório").trim().toLowerCase(),
    description: z.string().trim().optional(),
    price: z.number().min(0, "O preço deve ser pelo menos 0"),
    category: z.string().trim().toLowerCase().optional(),
    subCategory: z.string().trim().toLowerCase().optional(),
    subSubCategory: z.string().trim().toLowerCase().optional(),
    tags: z.array(z.string().trim().toLowerCase()).optional(),
    stock: z.number().min(0, "O estoque não pode ser negativo").optional(),
    brand: z.string().trim().optional(),
    image: z.string().url("A imagem deve ser uma URL válida").optional().or(z.string().trim().optional())
});
const updateProductSchema = productSchema.partial();
module.exports = {
    productSchema,
    updateProductSchema
};
