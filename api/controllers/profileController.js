const Attendance = require("../models/attendanceModel");
const User = require("../models/userModel");
const Student = require("../models/studentModel");
const Teacher = require("../models/teacherModel");
const Subject = require("../models/subjectModel");
const Panel = require("../models/panelModel");
const Course = require("../models/courseModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  let userDetails;

  if (user.role === "student") {
    userDetails = await Student.findOne({ _id: user.roleid })
      .populate({
        path: "course",
        select: "courseName branch year specialization",
      })
      .populate({
        path: "panel",
        select: "name timetable",
      });
  } else if (user.role === "teacher") {
    userDetails = await Teacher.findOne({ _id: user.roleid })
      .populate({
        path: "subjects.subname",
        select: "name units",
      })
      .populate({
        path: "subjects.panels",
        select: "name timetable",
      });
  }

  if (!userDetails) {
    userDetails = {};
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
      userDetails,
    },
  });
});
