const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
    date : {
        type : Date,
        required : true
    },
    subject:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subject"
    },
    students:[
        {
            stdId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Student"
            },
            attendance:{
                type : Boolean
            }
        }
    ]
})


// Backend example
// const express = require('express');
// const router = express.Router();
// const Attendance = require('../models/AttendanceModel');

// router.post('/attendance', async (req, res) => {
//   try {
//     const { date, subject, students } = req.body;

//     const attendance = new Attendance({
//       date,
//       subject,
//       students: students.map((student) => ({
//         stdId: student.stdId,
//         attendance: student.attendance,
//       })),
//     });

//     await attendance.save();
//     res.status(201).json({ message: 'Attendance recorded successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error recording attendance' });
//   }
// });

// module.exports = router;
