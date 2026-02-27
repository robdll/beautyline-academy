const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        trim: true,
        lowercase: true
    },
    subCategory: {
        type: String,
        trim: true,
        lowercase: true
    },
    subSubCategory: {
        type: String,
        trim: true,
        lowercase: true
    },
    tags: [{
        type: String,
        trim: true,
        lowercase: true
    }],
    stock: {
        type: Number,
        min: 0,
        default: 0
    },
    brand: {
        type: String,
        default: "Skin Renew"
    },
    image: String
}, { timestamps: true });
module.exports = mongoose.model("Product", productSchema);
