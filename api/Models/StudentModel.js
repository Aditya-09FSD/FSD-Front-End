const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  prn: {
    type: mongoose.Schema.Types.BigInt,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  panel: {
    type: String,
    required: true,
  },
  roll_no: {
    type: Number,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});
const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
