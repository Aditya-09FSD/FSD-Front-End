const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  num_of_panels: {
    type: Number,
    required: true,
  },

  num_of_students: {
    type: Number,
    required: true,
  },
});
const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
