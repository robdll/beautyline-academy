const Course = require("../model/courseDB.model");


const DUPLICATED_COURSE_CODE = 11000;


const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();

        if (courses.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(courses);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching courses" });
    }
}


const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).send({ message: "Course not found" });
        }

        res.status(200).json(course);

    } catch (err) {
        console.error(err);

        if (err.name === "CastError") {
            return res.status(400).json({ message: "Invalid course ID" });
        }

        res.status(500).json({ message: "Error fetching course" });
    }
}


const createCourse = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            level,
            price,
            startDate,
            endDate,
            capacity,
            materialsIncluded,
            trail,
            image
        } = req.body;

        const newCourse = new Course({
            title,
            description,
            category,
            level,
            price,
            startDate,
            endDate,
            capacity,
            materialsIncluded,
            trail,
            image
        });

        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);

    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid course data",
                details: err.errors
            });
        }

        if (err.code === DUPLICATED_COURSE_CODE) {
            return res.status(409).json({
                message: "Course title already exists"
            });
        }

        console.error(err);
        return res.status(500).json({ message: "Error creating course" });
    }
}


const updateCourse = async (req, res) => {
    try {
        const result = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
                context: "query",
            }
        );

        if (!result) {
            return res.status(404).send({ message: "Course not found" });
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
            return res.status(400).json({ message: "Invalid course ID" });
        }

        if (err.code === DUPLICATED_COURSE_CODE) {
            return res.status(409).json({
                message: "Course title already exists"
            });
        }

        return res.status(500).json({ message: "Internal error" });
    }
}


const deleteCourse = async (req, res) => {
    try {
        const result = await Course.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).send({ message: "Course not found" });
        }

        res.status(200).send("Course deleted successfully");

    } catch (err) {
        if (err.name === "CastError") {
            return res.status(400).json({ message: "Invalid course ID" });
        }

        console.error(err);
        res.status(500).json({ message: "Error deleting course" });
    }
}


module.exports = {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
};
