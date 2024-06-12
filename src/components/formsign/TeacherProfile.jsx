import { Form, Button, Container } from 'react-bootstrap';
import FormContainer from './FormContainer';
import Loader from '../Loader';
import { useUpdateTeacherMutation } from '../../slices/usersApiSlice';
import { useState, useEffect } from "react";
import { Link , useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import { setCredentials } from "../../slices/authSlice";

const TeacherProfile = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Additional state fields
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [biography, setBiography] = useState('');
  const [gender, setGender] = useState('');
  const [subjectsTaught, setSubjectsTaught] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [certifications, setCertifications] = useState('');
  const [address, setAddress] = useState('');
  const [availability, setAvailability] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('');
  const [favoriteColor, setFavoriteColor] = useState('');
  const [selfRating, setSelfRating] = useState('');

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateTeacherMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);

    // Initialize additional fields
    setPhone(userInfo.phone || '');
    setWebsite(userInfo.website || '');
    setDateOfBirth(userInfo.dateOfBirth ? userInfo.dateOfBirth.split('T')[0] : '');
    setProfilePicture(userInfo.profilePicture || '');
    setBiography(userInfo.biography || '');
    setGender(userInfo.gender || '');
    setSubjectsTaught(userInfo.subjectsTaught || '');
    setYearsOfExperience(userInfo.yearsOfExperience || '');
    setEducationLevel(userInfo.educationLevel || '');
    setCertifications(userInfo.certifications || '');
    setAddress(userInfo.address || '');
    setAvailability(userInfo.availability ? userInfo.availability.split('T')[0] : '');
    setPreferredLanguage(userInfo.preferredLanguage || '');
    setFavoriteColor(userInfo.favoriteColor || '');
    setSelfRating(userInfo.selfRating || '');
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name, 
          email,
          password,
          phone,
          website,
          dateOfBirth,
          profilePicture,
          biography,
          gender,
          subjectsTaught,
          yearsOfExperience,
          educationLevel,
          certifications,
          address,
          availability,
          preferredLanguage,
          favoriteColor,
          selfRating
        }).unwrap();
        console.log(res);
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <Container className='my-2'>
        <FormContainer>
          <h1>Update Profile</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* Additional Fields */}
            <Form.Group className='my-2' controlId='phone'>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='website'>
              <Form.Label>Website</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter website'
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='dateOfBirth'>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type='date'
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='profilePicture'>
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter profile picture URL'
                value={profilePicture}
                onChange={(e) => setProfilePicture(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='biography'>
              <Form.Label>Biography</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='Enter biography'
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='gender'>
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as='select'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value=''>Select...</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='subjectsTaught'>
              <Form.Label>Subjects Taught</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter subjects taught'
                value={subjectsTaught}
                onChange={(e) => setSubjectsTaught(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='yearsOfExperience'>
              <Form.Label>Years of Experience</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter years of experience'
                value={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='educationLevel'>
              <Form.Label>Education Level</Form.Label>
              <Form.Control
                as='select'
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
              >
                <option value=''>Select...</option>
                <option value='bachelors'>Bachelors</option>
                <option value='masters'>Masters</option>
                <option value='phd'>PhD</option>
                <option value='other'>Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='certifications'>
              <Form.Label>Certifications</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter certifications'
                value={certifications}
                onChange={(e) => setCertifications(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='availability'>
              <Form.Label>Availability</Form.Label>
              <Form.Control
                type='date'
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='preferredLanguage'>
              <Form.Label>Preferred Language</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter preferred language'
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='favoriteColor'>
              <Form.Label>Favorite Color</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter favorite color'
                value={favoriteColor}
                onChange={(e) => setFavoriteColor(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='selfRating'>
              <Form.Label>Self Rating</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter self rating'
                value={selfRating}
                onChange={(e) => setSelfRating(e.target.value)}
                min={1}
                max={5}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-3'>
              Update
            </Button>

            <Button  variant='primary' className='mt-3'>
              <Link to="/teacher-dashboard" > go back </Link> </Button>

            {isLoading && <Loader />}
          </Form>
        </FormContainer>
      </Container>
    </>
  );
};

export default TeacherProfile;
