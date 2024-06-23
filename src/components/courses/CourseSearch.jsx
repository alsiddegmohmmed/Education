import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Grid, Card, CardContent, CardMedia, Typography, InputLabel } from '@mui/material';

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
  noResultsText: {
    color: 'white',
  },
};

const CourseSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/courses/search?query=${query}`);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching search results', error);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <Container>
      <div style={styles.form}>
        <TextField
          label="Search for courses..."
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            style: { color: 'white', borderColor: 'white' },
            inputProps: { style: { color: 'white' } },
            notchedOutline: { borderColor: 'white' },
          }}
          InputLabelProps={{
            style: { color: 'white' },
          }}
          InputLabelComponent={(props) => (
            <InputLabel {...props} variant="standard" shrink={true} style={{ color: 'white' }} />
          )}
          placeholder="Search for courses..."
          style={styles.textField}
        />
      </div>
      {results.length > 0 ? (
        <Grid container spacing={4}>
          {results.map((course) => (
            <Grid item key={course._id} xs={12} sm={6} md={4}>
              <Card onClick={() => handleCourseClick(course._id)} style={styles.card}>
                <CardMedia
                  component="img"
                  alt={course.title}
                  height="140"
                  image="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww"
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
      ) : (
        query.trim() !== '' && (
          <Typography variant="body1" align="center" style={styles.noResultsText}>
            No results found for "{query}"
          </Typography>
        )
      )}
    </Container>
  );
};

export default CourseSearch;
