import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Container, Grid, Button} from '@mui/material';

const CourseList = () => {
  const [titles, setTitles] = useState([]);
  const navigate = useNavigate(); 
  useEffect(() => {
    fetchCourseTitles();
  }, []);

  const fetchCourseTitles = () => {
    axios.get('http://localhost:5000/api/users/getcoursetitles')
      .then(response => {
        setTitles(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  const handleTeacherHomeRedirect = () => {
    navigate('/teacher-dashboard');
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
            <Button variant="primary" onClick={handleTeacherHomeRedirect} className='me-2'>Go to home page </Button>

      <Grid container spacing={4}>
        {titles.map((title) => (
          <Grid item key={title._id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                image="https://via.placeholder.com/150"
                alt="title image"
                sx={{ height: 140 }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {title.title}
                </Typography>
                <Typography>
                  {title.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  By {title.createdBy.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CourseList;





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';



//   return (
//     <div className="course-list">
//       <ul>
//         {titles.map(course => (
//           <div key={course._id}>
//             <img src="https://elearningindustry.com/wp-content/uploads/2015/10/6-convincing-reasons-take-elearning-course.jpg" alt="" />
//           <li >{course.title}</li>
//           <li >{course.description}</li>
//           <li >{course.content}</li>
//           <li >{course.createdBy}</li>
//           <li >{course.createdBy.name}</li>
//           </div>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CourseList;
