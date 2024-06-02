import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../../slices/authSlice';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { useNavigate } from 'react-router-dom';
import ModalForm from '../modelform/ModalForm.jsx';



import Loader from '../Loader.jsx'
import Message from './Message.jsx';
import axios from 'axios';

const TeacherDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { userInfo } = useSelector((state) => state.auth);
    const  [logoutApiCall] = useLogoutMutation(); 
    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 
    const [showModal, setShowModal] = useState(false);
   

    const logoutHandler = async () => {
        try {
          await logoutApiCall().unwrap(); 
          dispatch(logout()); 
          navigate('/')
        } catch (err) {
          console.log(err);
        }
      };


      useEffect(() => {
       getAllUsers(); 
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
      }


      const deleteUser = (id, name) => {
        const token = localStorage.getItem('token'); // Adjust this based on how you store the token
    
        if (window.confirm(`Are you sure you want to delete ${name}`)) {
            axios.delete(`/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                alert(response.data.message);
                getAllUsers()
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

    return (
        <div>
            <div className='d-flex justify-content-between mx-7'>
            <div className='d-flex flex-row gap-5 '>
            <h1>Dashboard</h1>
            <h3 className='pt-2'>Welcome back {userInfo.name}</h3>
            </div>
            <div className='d-flex flex-row gap-5'>
        
            <Button variant="primary" onClick={handleShowModal}> Add new user </Button>
            <Button variant="primary" onClick={logoutHandler}> Logout </Button>
            </div>
            </div>
            {/* {error && <div className="alert alert-danger">{error}</div>}
            {loading ? (
                <div>Loading...</div>
            ) : ( */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                         {
                                users.map(user => {
                                    return <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            onClick={() => deleteUser(user._id, user.name)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                                })
                            }

                    </tbody>
                </Table>
                <ModalForm show={showModal} handleClose={handleCloseModal} handleSubmit={handleAddUser}  />

            <Button variant="primary" onClick={logoutHandler}> Logout </Button>
        </div>
    );
};


// onClick={logoutHandler}


export default TeacherDashboard;












const deleteUser= (id, name) => {
    if(window.confirm(`are you sure you want to delete %{name}`)) {
        
    }
    axios.get('/api/deleteUesr')
          .then(response => {
            setUsers(response.data);
            setLoading(false);
          })
          .catch(error => {
            setError(error);
            setLoading(false);
   });
}