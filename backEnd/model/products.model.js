
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },

    description: String,

    price: {
        type: Number,
        required: true,
        min: 0
    },

    category: String,
    subCategory: String,
    subSubCategory: String,

    tags: [String],

    stock: {
        type: Number,
        min: 0
    },

    brand: {
        type: String,
        default: "Skin Renew"
    },

    image: String

}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
