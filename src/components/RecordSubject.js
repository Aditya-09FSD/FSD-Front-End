import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RecordSubject() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    name: '',
    course: '',
    units: [''],
    lectures: ['']
  });
  const [isCardVisible, setIsCardVisible] = useState(true); // State to control visibility of the card

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('/api/courses');
        setCourses(res.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleArrayChange = (e, index, field) => {
    const newArray = [...form[field]];
    newArray[index] = e.target.value;
    setForm({ ...form, [field]: newArray });
  };

  const addArrayField = (field) => {
    setForm({ ...form, [field]: [...form[field], ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/subjects', form);
      alert('Subject data saved successfully');
      setForm({ name: '', course: '', units: [''], lectures: [''] });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleCloseCard = () => {
    setIsCardVisible(false); // Hide the card when the close button is clicked
  };

  if (!isCardVisible) return null; // Return null if the card is not visible

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-2xl transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-gray-50 relative">
        {/* Close Button */}
        <button
          onClick={handleCloseCard}
          className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Record Subject</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject Name:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Course:</label>
            <select
              name="course"
              value={form.course}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.courseName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Units:</label>
            {form.units.map((unit, index) => (
              <div key={index} className="mb-2 flex">
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => handleArrayChange(e, index, 'units')}
                  className="border border-gray-300 rounded-lg p-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => addArrayField('units')}
                  className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  +
                </button>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lectures:</label>
            {form.lectures.map((lecture, index) => (
              <div key={index} className="mb-2 flex">
                <input
                  type="text"
                  value={lecture}
                  onChange={(e) => handleArrayChange(e, index, 'lectures')}
                  className="border border-gray-300 rounded-lg p-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => addArrayField('lectures')}
                  className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  +
                </button>
              </div>
            ))}
          </div>

          <button type="submit" className="w-full p-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition duration-200">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default RecordSubject;
