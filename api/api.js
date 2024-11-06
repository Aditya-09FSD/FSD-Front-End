const express = require("express");
const morgan = require("morgan");
// const cors = require("cors");
const app = express();

// Import the new route handlers
const userRouter = require("./routes/userroutes");
const attendanceroutes = require("./routes/attendanceroutes");
const courseroutes = require("./routes/courseroutes");
const panelroutes = require("./routes/panelroutes");
const studentroutes = require("./routes/studentroutes");
const subjectroutes = require("./routes/subjectroutes");
const teacherroutes = require("./routes/teacherroutes");

const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.enable("trust proxy");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/api", (req, res) => {
  res.json({ message: "This is your API response" });
  console.log(req.cookies.jwt);
});

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/attendance", attendanceroutes);
app.use("/api/v1/courses", courseroutes);
app.use("/api/v1/panels", panelroutes);
app.use("/api/v1/students", studentroutes);
app.use("/api/v1/subjects", subjectroutes);
app.use("/api/v1/teachers", teacherroutes);

module.exports = app;
