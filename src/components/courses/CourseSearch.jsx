import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Grid, Card, CardContent, CardMedia, Typography, InputLabel } from '@mui/material';

const styles = {
  form: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0',
  },
  textField: {
    marginRight: '10px',
    flex: 1,
    color: 'white',
  },
  card: {
    cursor: 'pointer',
  },
};

const CourseSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/users/courses/search?query=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching search results', error);
    }
  };

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <Container>
      <form onSubmit={handleSearch} style={styles.form}>
        <TextField
          label="Search for courses..."
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            style: { color: 'white', borderColor: 'white' }, // Set color and border color to white
            inputProps: { style: { color: 'white' } }, // Set color of input text to white
            notchedOutline: { borderColor: 'white' }, // Set border color of the outline
          }}
          InputLabelProps={{
            style: { color: 'white' }, // Set color of label text to white
          }}
          InputLabelComponent={(props) => (
            <InputLabel {...props} variant="standard" shrink={true} style={{ color: 'white' }} />
          )}
          placeholder="Search for courses..." // Set placeholder text
          style={styles.textField}
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </form>
      {results.length > 0 && (
        <Grid container spacing={4}>
          {results.map((course) => (
            <Grid item key={course._id} xs={12} sm={6} md={4}>
              <Card onClick={() => handleCourseClick(course._id)} style={styles.card}>
                <CardMedia
                  component="img"
                  alt={course.title}
                  height="140"
                  image="https://via.placeholder.com/150"
                  title={course.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {course.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    By {course.createdBy?.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default CourseSearch;
