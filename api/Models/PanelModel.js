const mongoose = require("mongoose");
const Course = require("./courseModel"); // Assuming you have a Course model

const PanelSchema = new mongoose.Schema({
  name: String,
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  teachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
  ],
  timetable: [
    {
      subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
      teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
      },
      location: {
        type: String,
      },
      timing: {
        type: String,
      },
    },
  ],
});

// Helper function to generate the panel name
const generatePanelName = async (courseId) => {
  const course = await Course.findById(courseId);
  if (!course) {
    throw new Error("Course not found");
  }

  // Get the initials of the course
  const initials = course.name
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("");

  // Find existing panels for the same course and determine the increment
  const existingPanels = await Panel.find({ course: courseId });
  const panelCount = existingPanels.length;

  // Return panel name as the course initials followed by an incremental value
  return `${initials}-${panelCount + 1}`;
};

// Pre-save hook to generate the panel name
PanelSchema.pre("save", async function (next) {
  if (!this.name) {
    try {
      // Generate panel name using the course ID
      this.name = await generatePanelName(this.course);
    } catch (err) {
      next(err);
    }
  }
  next();
});

const Panel = mongoose.model("Panel", PanelSchema);
module.exports = Panel;
