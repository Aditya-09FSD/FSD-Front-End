import React, { useState } from 'react';
import axios from 'axios';

function RecordTeacherCard() {
  const [form, setForm] = useState({
    name: '',
    prn: '',
    username: '',
    password: '',
    subjects: [
      {
        subname: '',
        panels: [''],
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubjectChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSubjects = [...form.subjects];
    updatedSubjects[index][name] = value;
    setForm({ ...form, subjects: updatedSubjects });
  };

  const handlePanelChange = (e, index, panelIndex) => {
    const updatedPanels = [...form.subjects[index].panels];
    updatedPanels[panelIndex] = e.target.value;
    const updatedSubjects = [...form.subjects];
    updatedSubjects[index].panels = updatedPanels;
    setForm({ ...form, subjects: updatedSubjects });
  };

  const addSubject = () => {
    setForm({
      ...form,
      subjects: [...form.subjects, { subname: '', panels: [''] }],
    });
  };

  const addPanel = (index) => {
    const updatedSubjects = [...form.subjects];
    updatedSubjects[index].panels.push('');
    setForm({ ...form, subjects: updatedSubjects });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/teachers', form);
      alert('Teacher data saved successfully');
      setForm({
        name: '',
        prn: '',
        username: '',
        password: '',
        subjects: [{ subname: '', panels: [''] }],
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add Teacher Information
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2 w-full focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                PRN
              </label>
              <input
                type="text"
                name="prn"
                value={form.prn}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2 w-full focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2 w-full focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2 w-full focus:ring focus:ring-blue-200"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Subjects
            </label>
            {form.subjects.map((subject, index) => (
              <div key={index} className="border border-gray-200 p-4 rounded-lg mb-4">
                <input
                  type="text"
                  name="subname"
                  value={subject.subname}
                  onChange={(e) => handleSubjectChange(e, index)}
                  placeholder="Subject Name"
                  required
                  className="border border-gray-300 rounded-lg p-2 w-full mb-2 focus:ring focus:ring-blue-200"
                />
                {subject.panels.map((panel, panelIndex) => (
                  <div key={panelIndex} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={panel}
                      onChange={(e) => handlePanelChange(e, index, panelIndex)}
                      placeholder="Panel"
                      className="border border-gray-300 rounded-lg p-2 w-full focus:ring focus:ring-blue-200"
                    />
                    <button
                      type="button"
                      onClick={() => addPanel(index)}
                      className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>
            ))}
            <button
              type="button"
              onClick={addSubject}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add Another Subject
            </button>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            Save Teacher Information
          </button>
        </form>
      </div>
    </div>
  );
}

export default RecordTeacherCard;
