import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateTeacherMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { Container, Grid, TextField, Button, Typography, MenuItem, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Loader from '../Loader';

const TeacherProfile = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    website: '',
    dateOfBirth: '',
    profilePicture: '',
    biography: '',
    gender: '',
    subjectsTaught: '',
    yearsOfExperience: '',
    educationLevel: '',
    certifications: '',
    address: '',
    availability: '',
    preferredLanguage: '',
    favoriteColor: '',
    selfRating: ''
  });

  const [imagePreview, setImagePreview] = useState('');
  const formInitialized = useRef(false);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateTeacherMutation();

  useEffect(() => {
    if (!formInitialized.current) {
      setFormState({
        name: userInfo.name || '',
        email: userInfo.email || '',
        phone: userInfo.phone || '',
        website: userInfo.website || '',
        dateOfBirth: userInfo.dateOfBirth ? userInfo.dateOfBirth.split('T')[0] : '',
        profilePicture: userInfo.profilePicture || '',
        biography: userInfo.biography || '',
        gender: userInfo.gender || '',
        subjectsTaught: userInfo.subjectsTaught || '',
        yearsOfExperience: userInfo.yearsOfExperience || '',
        educationLevel: userInfo.educationLevel || '',
        certifications: userInfo.certifications || '',
        address: userInfo.address || '',
        availability: userInfo.availability ? userInfo.availability.split('T')[0] : '',
        preferredLanguage: userInfo.preferredLanguage || '',
        favoriteColor: userInfo.favoriteColor || '',
        selfRating: userInfo.selfRating || ''
      });
      setImagePreview(userInfo.profilePicture || '');
      formInitialized.current = true;
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePicture' && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormState({ ...formState, profilePicture: file });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormState({ ...formState, [name]: value });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (formState.password !== formState.confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const formData = new FormData();
        for (const key in formState) {
          formData.append(key, formState[key]);
        }
        const res = await updateProfile({ _id: userInfo._id, formData }).unwrap();
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
        console.log('Profile updated:', res);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Update Profile
        </Typography>
        <form onSubmit={submitHandler}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={formState.email}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formState.confirmPassword}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            {/* Additional Fields */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formState.phone}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Website"
                name="website"
                value={formState.website}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                name="dateOfBirth"
                value={formState.dateOfBirth}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <input
                accept="image/*"
                style={styles.imageInput}
                id="profile-picture-upload"
                type="file"
                name="profilePicture"
                onChange={handleChange}
              />
              <label htmlFor="profile-picture-upload">
                <Button variant="contained" color="primary" component="span">
                  Upload Profile Picture
                </Button>
              </label>
              {imagePreview && (
                <Box mt={2} textAlign="center">
                  <img src={imagePreview} alt="Profile Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Biography"
                name="biography"
                value={formState.biography}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Gender"
                name="gender"
                value={formState.gender}
                onChange={handleChange}
                select
                variant="outlined"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Subjects Taught"
                name="subjectsTaught"
                value={formState.subjectsTaught}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Years of Experience"
                type="number"
                name="yearsOfExperience"
                value={formState.yearsOfExperience}
                onChange={handleChange}
                variant="outlined"
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Education Level"
                name="educationLevel"
                value={formState.educationLevel}
                onChange={handleChange}
                select
                variant="outlined"
              >
                <MenuItem value="bachelors">Bachelors</MenuItem>
                <MenuItem value="masters">Masters</MenuItem>
                <MenuItem value="phd">PhD</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Certifications"
                name="certifications"
                value={formState.certifications}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formState.address}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Availability"
                type="date"
                name="availability"
                value={formState.availability}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Preferred Language"
                name="preferredLanguage"
                value={formState.preferredLanguage}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Favorite Color"
                name="favoriteColor"
                value={formState.favoriteColor}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Self Rating"
                type="number"
                name="selfRating"
                value={formState.selfRating}
                onChange={handleChange}
                variant="outlined"
                InputProps={{ inputProps: { min: 1, max: 5 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Update
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth>
                <Link to="/teacher-dashboard" style={{ color: 'white', textDecoration: 'none' }}>
                  Go back
                </Link>
              </Button>
            </Grid>
            {isLoading && (
              <Grid item xs={12}>
                <Loader />
              </Grid>
            )}
          </Grid>
        </form>
      </Container>
    </>
  );
};

const styles = {
  imageInput: {
    display: 'none',
  },
};

export default TeacherProfile;
