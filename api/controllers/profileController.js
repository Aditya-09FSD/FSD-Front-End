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
  // Find the user by their ID
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  let userDetails;

  // Conditionally populate data based on the user's role
  if (user.role === "student") {
    // Get basic student details
    userDetails = await Student.findOne({ _id: user.roleid })
      .populate({
        path: "course",
        select: "courseName branch year specialization",
      })
      .populate({
        path: "panel",
        select: "name timetable",
        populate: {
          path: "timetable.subject",
          select: "name units",
        },
      });

    // Fetch subjects related to the course
    const courseSubjects = await Subject.find({
      course: userDetails.course._id,
    }).select("name units");

    // Calculate attendance for each subject
    const subjectsAttendance = await Promise.all(
      courseSubjects.map(async (subject) => {
        const attendanceRecords = await Attendance.find({
          subject: subject._id,
          "students.stdId": user.roleid,
        });

        const totalLectures = attendanceRecords.length;
        const totalAttended = attendanceRecords.filter((record) =>
          record.students.some(
            (student) => student.stdId.equals(user.roleid) && student.attendance
          )
        ).length;

        return {
          subject: {
            _id: subject._id,
            name: subject.name,
            units: subject.units,
          },
          attendanceStats: {
            totalLectures,
            totalAttended,
          },
        };
      })
    );

    // Add subjectsAttendance to userDetails
    userDetails = {
      ...userDetails.toObject(),
      subjectsAttendance,
    };
  } else if (user.role === "teacher") {
    // For teachers, fetch their subjects and associated panels
    userDetails = await Teacher.findOne({ _id: user.roleid })
      .populate({
        path: "subjects.subname",
        select: "name units",
      })
      .populate({
        path: "subjects.panels",
        select: "name timetable",
        populate: {
          path: "timetable.subject",
          select: "name units",
        },
      });
  }

  if (!userDetails && user.role !== "admin") {
    return next(new AppError("No details found for this user", 404));
  }

  // Send the response with user and their specific details
  res.status(200).json({
    status: "success",
    data: {
      user,
      userDetails,
    },
  });
});
