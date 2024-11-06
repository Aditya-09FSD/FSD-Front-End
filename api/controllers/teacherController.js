const Teacher = require("../models/teacherModel");
const factory = require("./handlerFactory");

// Basic CRUD operations
exports.getAllTeachers = factory.getAll(Teacher);
exports.getTeacher = factory.getOne(Teacher);
exports.createTeacher = factory.createOne(Teacher);
exports.updateTeacher = factory.updateOne(Teacher);
exports.deleteTeacher = factory.deleteOne(Teacher);
