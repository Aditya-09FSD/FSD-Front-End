const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const User = require("../models/userModel");
const Student = require("../models/studentModel");
const Teacher = require("../models/teacherModel");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id);

      if (!doc) {
        return next(new AppError("No document found with that ID", 404));
      }

      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (err) {
      next(err);
    }
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!doc) {
        return next(new AppError("No document found with that ID", 404));
      }

      res.status(200).json({
        status: "success",
        data: {
          data: doc,
        },
      });
    } catch (err) {
      next(err);
    }
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    try {
      const doc = await Model.create([req.body]);

      res.status(201).json({
        status: "success",
        data: {
          data: doc[0],
        },
      });
    } catch (err) {
      next(err);
    }
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    if (doc.role === "student") {
      const student = await Student.findById(doc.roleid);
      if (student) {
        // Add student details to the current doc
        doc.studentDetails = student;
      }
    } else if (doc.role === "teacher") {
      const teacher = await Teacher.findById(doc.roleid);
      if (teacher) {
        // Add teacher details to the current doc
        doc.teacherDetails = teacher;
      }
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.find();

    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });

exports.getbyid = (Model) =>
  catchAsync(async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies) {
      token = req.cookies.jwt;
    }
    if (!token) {
      return next(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);

    let filter = {};
    if (req.params.userid) filter = { userid: currentUser._id };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      orders: doc,
    });
  });

exports.updateUser = (Model, User) =>
  catchAsync(async (req, res, next) => {
    try {
      const userId = req.params.userId;
      let filter = { userid: userId };

      const orders = await Model.find(filter);
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.orders = orders;
      user.password = req.body.password;
      user.passwordConfirm = req.body.passwordConfirm;
      await user.save();

      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  });
