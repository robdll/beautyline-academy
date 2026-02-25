
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },

    description: {
        type: String,
        trim: true,
        lowercase: true
    }

    price: {
        type: Number,
        required: true,
        min: 0
    },

    category: {
        type: String,
        trim: true,
        lowercase: true
    }

    subCategory: {
        type: String,
        trim: true,
        lowercase: true
    }

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
