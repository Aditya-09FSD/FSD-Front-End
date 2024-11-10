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
  const user = await User.findById(req.user.id)
    .populate({
      path: "roleid",
      populate: [
        {
          path: "course",
          model: "Course",
        },
        {
          path: "panel",
          model: "Panel",
          populate: {
            path: "students teachers timetable.subject timetable.teacher",
            populate: [
              { path: "subject", model: "Subject" },
              { path: "teacher", model: "Teacher" },
              { path: "students", model: "Student" },
            ],
          },
        },
        {
          path: "subjects",
          model: "Subject",
        },
      ],
    })
    .select("-password"); // Exclude the password from the response for security reasons

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
