
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },


    category: {
        type: String,
        enum: ["nails", "lashes", "eyebrows", "facial", "waxing"],
        required: true
    },


    level: {
        type: String,
        enum: ["basic", "intermediate", "advanced"]
    },


    price: {
        type: Number,
        required: true
    },


    startDate: Date,
    endDate: Date,

    capacity: Number,

    materialsIncluded: {
        type: Boolean,
        default: true
    },

    trail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trail"
    },

    image: String

}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);