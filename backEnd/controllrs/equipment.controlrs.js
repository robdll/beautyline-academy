const Equipment = require("../model/equipament.model");

const DUPLICATED_EQUIPMENT_CODE = 11000;

const getEquipments = async (req, res) => {
    try {
        const equipments = await Equipment.find();

        if (equipments.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(equipments);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching equipments" });
    }
}


const getEquipmentById = async (req, res) => {
    try {
        const equipment = await Equipment.findById(req.params.id);

        if (!equipment) {
            return res.status(404).send({ message: "Equipment not found" });
        }

        res.status(200).json(equipment);

    } catch (err) {
        console.error(err);

        if (err.name === "CastError") {
            return res.status(400).json({ message: "Invalid equipment ID" });
        }

        res.status(500).json({ message: "Error fetching equipment" });
    }
}


const createEquipment = async (req, res) => {
    try {
        const {
            name,
            description,
            category,
            salePrice,
            rentalPrice,
            availableForSale,
            availableForRental,
            stock,
            image
        } = req.body;

        const newEquipment = new Equipment({
            name,
            description,
            category,
            salePrice,
            rentalPrice,
            availableForSale,
            availableForRental,
            stock,
            image
        });

        const savedEquipment = await newEquipment.save();
        res.status(201).json(savedEquipment);

    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid equipment data",
                details: err.errors
            });
        }

        if (err.code === DUPLICATED_EQUIPMENT_CODE) {
            return res.status(409).json({
                message: "Equipment name already exists"
            });
        }

        console.error(err);
        return res.status(500).json({ message: "Error creating equipment" });
    }
}


const updateEquipment = async (req, res) => {
    try {
        const result = await Equipment.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
                context: "query",
            }
        );

        if (!result) {
            return res.status(404).send({ message: "Equipment not found" });
        }

        res.status(200).json(result);

    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid data",
                details: err.errors
            });
        }

        if (err.name === "CastError") {
            return res.status(400).json({ message: "Invalid equipment ID" });
        }

        if (err.code === DUPLICATED_EQUIPMENT_CODE) {
            return res.status(409).json({
                message: "Name already exists"
            });
        }

        return res.status(500).json({ message: "Internal error" });
    }
}


const deleteEquipment = async (req, res) => {
    try {
        const result = await Equipment.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).send({ message: "Equipment not found" });
        }

        res.status(200).send("Equipment deleted successfully");

    } catch (err) {
        if (err.name === "CastError") {
            return res.status(400).json({ message: "Invalid equipment ID" });
        }

        console.error(err);
        res.status(500).json({ message: "Error deleting equipment" });
    }
}


module.exports = {
    getEquipments,
    getEquipmentById,
    createEquipment,
    updateEquipment,
    deleteEquipment
};
