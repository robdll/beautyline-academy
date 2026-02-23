// Course model
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true
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
        required: true,
        min: 1
    },


    startDate: {
        type: Date
    },

    endDate: {
        type: Date,
        validate: {
            validator: function (value) {
                // Allow missing endDate; enforce only when both dates are present
                if (!value || !this.startDate) {
                    return true;
                }
                return value >= this.startDate;
            },
            message: "endDate must be greater than or equal to startDate"
        }
    },
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
