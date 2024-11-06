const Student = require("../models/studentModel");
const factory = require("./handlerFactory");

// Basic CRUD operations
exports.getAllStudents = factory.getAll(Student);
exports.getStudent = factory.getOne(Student);
exports.createStudent = factory.createOne(Student);
exports.updateStudent = factory.updateOne(Student);
exports.deleteStudent = factory.deleteOne(Student);
