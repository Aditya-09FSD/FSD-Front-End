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

// Sign-up function with dynamic role
exports.signup = catchAsync(async (req, res, next) => {
  let newUser;

  if (req.body.role === "student") {
    newUser = await Student.create(req.body); // Create student
  } else if (req.body.role === "teacher") {
    newUser = await Teacher.create(req.body); // Create teacher
  } else {
    newUser = await User.create(req.body); // Create normal user/admin
  }

  createSendToken(newUser, 201, req, res);
});

// Login function with dynamic model resolution
exports.login = catchAsync(async (req, res, next) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return next(
      new AppError("Please provide username, password, and role!", 400)
    );
  }

  // Select model based on the role
  let Model;
  if (role === "student") {
    Model = Student;
  } else if (role === "teacher") {
    Model = Teacher;
  } else {
    Model = User;
  }

  // Find user in the appropriate collection
  const user = await Model.findOne({ username }).select("+password");

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

  // Check which model to use based on role in token (optional step)
  const currentUser =
    (await User.findById(decoded.id)) ||
    (await Student.findById(decoded.id)) ||
    (await Teacher.findById(decoded.id));

  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no longer exists.", 401)
    );
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  req.user = currentUser;
  res.locals.user = currentUser;
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
  const Model =
    req.body.role === "teacher"
      ? Teacher
      : req.body.role === "student"
      ? Student
      : User;

  const user = await Model.findOne({ username: req.body.username });
  if (!user) {
    return next(new AppError("There is no user with that username.", 404));
  }

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

  const user =
    (await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    })) ||
    (await Student.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    })) ||
    (await Teacher.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    }));

  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  createSendToken(user, 200, req, res);
});

// Update password
exports.updatePassword = catchAsync(async (req, res, next) => {
  const user =
    (await User.findById(req.user.id).select("+password")) ||
    (await Student.findById(req.user.id).select("+password")) ||
    (await Teacher.findById(req.user.id).select("+password"));

  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  createSendToken(user, 200, req, res);
});
