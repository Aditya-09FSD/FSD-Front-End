const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Import models (for user, teacher, student, etc.)
const User = require("../models/userModel");
const Student = require("../models/studentModel");
const Teacher = require("../models/teacherModel");

// Helper function to sign JWT token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Helper function to send token response
const createSendToken = (user, statusCode, req, res, view = false) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });
  user.password = undefined;

  if (view === false) {
    res.status(statusCode).json({
      status: "success",
      login: true,
      token,
      role: user.role,
    });
  } else {
    res.status(statusCode);
  }
};

exports.signup = catchAsync(async (req, res, next) => {
  let newUser;

  // Handle case for Teacher signup
  if (req.body.role === "teacher") {
    // Create teacher-specific data
    const teacher = await Teacher.create({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      prn: req.body.prn,
      subjects: req.body.subjects || [],
    });

    // Create user with role as teacher and reference teacher's _id
    newUser = await User.create({
      name: req.body.name,
      username: req.body.username,
      phone: req.body.phone,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: "teacher",
      roleid: teacher._id, // Link user to teacher
    });
  }

  // Handle case for Student signup
  else if (req.body.role === "student") {
    // Create student-specific data
    const student = await Student.create({
      name: req.body.name,
      prn: req.body.prn,
      panel: req.body.panel,
      roll_no: req.body.roll_no,
      course: req.body.course, // Assuming this is the course's ObjectId
    });

    // Create user with role as student and reference student's _id
    newUser = await User.create({
      name: req.body.name,
      username: req.body.username,
      phone: req.body.phone,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: "student",
      roleid: student._id, // Link user to student
    });
  }

  // Handle case for Admin or general user signup (no need for teacher or student model)
  else {
    newUser = await User.create(req.body); // Admin or other general user
  }

  // Create and send the JWT token
  createSendToken(newUser, 201, req, res);
});

// Login function with dynamic model resolution
exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(
      new AppError("Please provide username, password, and role!", 400)
    );
  }

  // Find user in the appropriate collection
  const user = await User.findOne({ username }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect username, password, or role", 401));
  }

  createSendToken(user, 200, req, res);
});

// Logout user
exports.logout = (req, res) => {
  res.status(200).json({ status: req.cookies });
};

// Protect middleware
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Find the user in the User collection
  const user = await User.findById(decoded.id);

  if (!user) {
    return next(
      new AppError("The user belonging to this token no longer exists.", 401)
    );
  }

  // Check if the user has changed their password after the token was issued
  if (user.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  // Based on the role, fetch additional details from Student or Teacher
  if (user.role === "student") {
    const student = await Student.findById(user.roleid);
    if (student) {
      // Add student details to the current user
      user.studentDetails = student;
    }
  } else if (user.role === "teacher") {
    const teacher = await Teacher.findById(user.roleid);
    if (teacher) {
      // Add teacher details to the current user
      user.teacherDetails = teacher;
    }
  }

  // Assign the enriched user object to the request object and pass it to the next middleware
  req.user = user;
  res.locals.user = user;

  next();
});

// Restrict routes to specific roles (e.g., teacher, student)
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

// Forgot password function (works across roles)
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // Find the user by username
  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return next(new AppError("There is no user with that username.", 404));
  }

  // Create the password reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`;
    // Send reset password email (assuming a sendPasswordResetEmail function exists)
    await new Email(user, resetURL).sendPasswordReset();
    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError("Error sending the email. Try again later!", 500));
  }
});

// Reset password
exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // Find the user by the hashed token and check if it is still valid
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  // Update password and reset token
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // Send a new token and log the user in
  createSendToken(user, 200, req, res);
});

// Update password
exports.updatePassword = catchAsync(async (req, res, next) => {
  // Find the current user by their ID
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  // Set new password and save it
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // Send a new token and log the user in
  createSendToken(user, 200, req, res);
});
