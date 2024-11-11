const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  panel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Panel",
  },
  students: [
    {
      stdId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
      attendance: {
        type: Boolean,
      },
    },
  ],
});
const Attendance = mongoose.model("Attendance", AttendanceSchema);
module.exports = Attendance;
