// TeacherDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await axios.get('/api/teacher/dashboard', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setStudents(response.data);
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <ul>
        {students.map(student => (
          <li key={student._id}>{student.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherDashboard;
