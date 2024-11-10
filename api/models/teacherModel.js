const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  prn: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  subjects: [
    {
      subname: {
        type: String,
        required: true,
      },
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      panels: {
        type: [String],
        default: [],
      },
    },
  ],
});
const Teacher = mongoose.model("Teacher", TeacherSchema);
module.exports = Teacher;
