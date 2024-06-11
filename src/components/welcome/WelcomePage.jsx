import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Grid, makeStyles } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: 'url(/path/to/your/background/image.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  content: {
    position: 'relative',
    zIndex: 2,
  },
  buttons: {
    marginTop: theme.spacing(4),
  },
  button: {
    margin: theme.spacing(2),
    width: '200px',
    fontSize: '18px',
  },
}));

const WelcomePage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleStudentClick = () => {
    navigate('/login?role=student');
  };

  const handleTeacherClick = () => {
    navigate('/login?role=teacher');
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.overlay} />
      <Container className={classes.content}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Edusity
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Your journey to better education starts here
        </Typography>
        <Grid container justifyContent="center" className={classes.buttons}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleStudentClick}
            >
              Are you a student?
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={handleTeacherClick}
            >
              Are you a teacher?
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WelcomePage;
