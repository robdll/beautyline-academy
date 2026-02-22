const {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
} = require("./course.controlrs");
const Course = require("../model/courseDB.model");

jest.mock("../model/courseDB.model");

describe("Course Controllers", () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: {},
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis()
        };
        jest.clearAllMocks();
    });

    describe("getCourses", () => {
        it("should return 200 and all courses", async () => {
            const mockCourses = [{ title: "Course 1" }, { title: "Course 2" }];
            Course.find.mockResolvedValue(mockCourses);

            await getCourses(req, res);

            expect(Course.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockCourses);
        });

        it("should return 200 and an empty array if no courses found", async () => {
            Course.find.mockResolvedValue([]);

            await getCourses(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([]);
        });

        it("should return 500 if an error occurs", async () => {
            Course.find.mockRejectedValue(new Error("DB Error"));

            await getCourses(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Error fetching courses" });
        });
    });

    describe("getCourseById", () => {
        it("should return 200 and the course if found", async () => {
            const mockCourse = { title: "Course 1" };
            req.params.id = "validId";
            Course.findById.mockResolvedValue(mockCourse);

            await getCourseById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockCourse);
        });

        it("should return 404 if course not found (send style)", async () => {
            req.params.id = "nonExistentId";
            Course.findById.mockResolvedValue(null);

            await getCourseById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({ message: "Course not found" });
        });

        it("should return 400 if ID is invalid (CastError)", async () => {
            req.params.id = "invalidId";
            const error = new Error();
            error.name = "CastError";
            Course.findById.mockRejectedValue(error);

            await getCourseById(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Invalid course ID" });
        });
    });

    describe("createCourse", () => {
        it("should return 201 and the saved course", async () => {
            const mockCourseData = { title: "New Course", price: 100 };
            req.body = mockCourseData;

            // Mocking the constructor and save method
            const saveMock = jest.fn().mockResolvedValue(mockCourseData);
            Course.mockImplementation(() => ({
                save: saveMock
            }));

            await createCourse(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockCourseData);
            expect(saveMock).toHaveBeenCalled();
        });

        it("should return 400 for Validation Error", async () => {
            const error = new Error();
            error.name = "ValidationError";
            error.errors = { title: "Required" };

            Course.mockImplementation(() => ({
                save: jest.fn().mockRejectedValue(error)
            }));

            await createCourse(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: "Invalid course data" }));
        });

        it("should return 409 for duplicate title", async () => {
            const error = new Error();
            error.code = 11000;

            Course.mockImplementation(() => ({
                save: jest.fn().mockRejectedValue(error)
            }));

            await createCourse(req, res);

            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith({ message: "Course title already exists" });
        });
    });

    describe("updateCourse", () => {
        it("should return 200 and updated course", async () => {
            const updatedCourse = { title: "Updated Title" };
            req.params.id = "validId";
            req.body = { title: "Updated Title" };
            Course.findByIdAndUpdate.mockResolvedValue(updatedCourse);

            await updateCourse(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedCourse);
        });

        it("should return 404 if course not found on update", async () => {
            req.params.id = "nonExistentId";
            Course.findByIdAndUpdate.mockResolvedValue(null);

            await updateCourse(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({ message: "Course not found" });
        });
    });

    describe("deleteCourse", () => {
        it("should return 200 and success string", async () => {
            req.params.id = "validId";
            Course.findByIdAndDelete.mockResolvedValue({ id: "validId" });

            await deleteCourse(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith("Course deleted successfully");
        });

        it("should return 404 if course not found on delete", async () => {
            req.params.id = "nonExistentId";
            Course.findByIdAndDelete.mockResolvedValue(null);

            await deleteCourse(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({ message: "Course not found" });
        });
    });
});
