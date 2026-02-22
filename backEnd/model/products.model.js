
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    description: String,

    price: {
        type: Number,
        required: true
    },

    category: String,
    subCategory: String,
    subSubCategory: String,

    tags: [String],

    stock: Number,

    brand: {
        type: String,
        default: "Skin Renew"
    },

    image: String

}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);