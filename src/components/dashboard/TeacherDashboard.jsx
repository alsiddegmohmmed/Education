import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { logout } from '../../slices/authSlice';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { useNavigate, Link } from 'react-router-dom';
import ModalForm from '../modelform/ModalForm.jsx';
import Loader from '../Loader.jsx';
import Message from './Message.jsx';
import axios from 'axios';
import Header from '../header/Header.jsx';
import Sidebar from '../sidebar/Sidebar.jsx';
import { Dialog, DialogActions, DialogContent, DialogTitle, Box, IconButton, Typography } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const TeacherDashboard = () => {
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  const getAllUsers = () => {
    axios.get('/api/getUsers')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  const getAllStudents = () => {
    axios.get('http://localhost:5000/api/users/students')
      .then(response => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  const deleteUser = (id, name) => {
    const token = localStorage.getItem('token');

    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      axios.delete(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          alert(response.data.message);
          getAllUsers();
        })
        .catch(error => {
          console.error('There was an error deleting the user!', error);
        });
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);
    handleCloseModal();
  };

  const handleAddCourseRedirect = () => {
    navigate('/add-course');
  };

  const handleCoursesRedirect = () => {
    navigate('/CourseList');
  };

  return (
    <div className="pageWrapper d-lg-flex" style={{ height: '100vh' }}>
      <aside className="sidebarArea shadow" id="sidebarArea">
        <Sidebar />
      </aside>
      <div className="contentArea" style={{ flex: 1 }}>
        <Header />
        <Container className="p-4 wrapper" fluid>
          <Row className='my-4'>
            <Col>
              <Card>
                <Card.Body>
                  <div className='d-flex justify-content-between'>
                    <div>
                      <h1>Dashboard</h1>
                      <h3>Welcome back {userInfo.name}</h3>
                    </div>
                    <div>
                      <Button variant="primary" onClick={handleShowModal} className='me-2'>Add new user</Button>
                      <Button variant="primary" onClick={logoutHandler} className='me-2'>Logout</Button>
                      <Button variant="primary" onClick={handleAddCourseRedirect} className='me-2'>Add course</Button>
                      <Button variant="primary" onClick={handleCoursesRedirect} className='me-2'>Browse Courses</Button>
                      <Link to='/teacher-profile'><Button variant='primary'>Edit Profile</Button></Link>
                    </div>
                  </div>
                  {loading ? (
                    <Loader />
                  ) : error ? (
                    <Message variant="danger">{error}</Message>
                  ) : (
                    <Table striped bordered hover responsive className="mt-4">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map(student => (
                          <tr key={student._id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.role}</td>
                            <td>
                              <IconButton
                                color="error"
                                onClick={() => deleteUser(student._id, student.name)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                  
                  <ModalForm show={showModal} handleClose={handleCloseModal} handleSubmit={handleAddUser} />

                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default TeacherDashboard;
