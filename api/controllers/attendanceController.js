const Attendance = require("../models/attendanceModel");
const factory = require("./handlerFactory");

// Basic CRUD operations
exports.getAllAttendances = factory.getAll(Attendance);
exports.getAttendance = factory.getOne(Attendance);
exports.createAttendance = factory.createOne(Attendance);
exports.updateAttendance = factory.updateOne(Attendance);
exports.deleteAttendance = factory.deleteOne(Attendance);
