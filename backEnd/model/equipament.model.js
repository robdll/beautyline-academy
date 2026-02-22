
const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    description: String,

    category: String,

    salePrice: Number,
    rentalPrice: Number,

    availableForSale: {
        type: Boolean,
        default: true
    },

    availableForRental: {
        type: Boolean,
        default: true
    },

    stock: Number,

    image: String

}, { timestamps: true });

module.exports = mongoose.model("Equipment", equipmentSchema);