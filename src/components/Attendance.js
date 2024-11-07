import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Attendance() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [date, setDate] = useState('');
  const [subject, setSubject] = useState('');
  const [students, setStudents] = useState([{ stdId: '', attendance: false }]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get('/api/attendance');
        setAttendanceRecords(response.data);
      } catch (error) {
        console.error('Error fetching attendance:', error);
      }
    };

    fetchAttendance();
  }, []);

  const handleAddAttendance = async (e) => {
    e.preventDefault();
    try {
      const newRecord = { date, subject, students };
      const response = await axios.post('/api/attendance', newRecord);
      setAttendanceRecords([...attendanceRecords, response.data]);
      setDate('');
      setSubject('');
      setStudents([{ stdId: '', attendance: false }]);
    } catch (error) {
      console.error('Error adding attendance:', error);
    }
  };

  return (
    <div>
      <h2>Attendance Records</h2>
      {attendanceRecords.map(record => (
        <div key={record._id}>
          <p>Date: {new Date(record.date).toLocaleDateString()}</p>
          <p>Subject ID: {record.subject}</p>
          <ul>
            {record.students.map(student => (
              <li key={student.stdId}>
                Student ID: {student.stdId}, Present: {student.attendance ? 'Yes' : 'No'}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <h2>Add Attendance</h2>
      <form onSubmit={handleAddAttendance}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="text" placeholder="Subject ID" value={subject} onChange={(e) => setSubject(e.target.value)} required />
        
        {students.map((student, index) => (
          <div key={index}>
            <input type="text" placeholder="Student ID" value={student.stdId} onChange={(e) => {
              const newStudents = [...students];
              newStudents[index].stdId = e.target.value;
              setStudents(newStudents);
            }} required />
            <label>
              Present
              <input type="checkbox" checked={student.attendance} onChange={(e) => {
                const newStudents = [...students];
                newStudents[index].attendance = e.target.checked;
                setStudents(newStudents);
              }} />
            </label>
          </div>
        ))}
        <button type="button" onClick={() => setStudents([...students, { stdId: '', attendance: false }])}>
          Add Student
        </button>
        <button type="submit">Submit Attendance</button>
      </form>
    </div>
  );
}

export default Attendance;
