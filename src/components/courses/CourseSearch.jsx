import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests

const CourseSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/users/searchCourses?search=${query}`); // Adjust the endpoint as per your backend
      setResults(response.data);
    } catch (error) {
      console.error('Error searching for courses:', error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for courses..."
          value={query}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {results.map((course) => (
          <li key={course._id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>Created By: {course.createdBy.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseSearch;
