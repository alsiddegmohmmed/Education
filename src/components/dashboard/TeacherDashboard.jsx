import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../../slices/authSlice';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { useNavigate } from 'react-router-dom';


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
        // Fetch data from MockAPI
        // axios.get('https://664db618ede9a2b5565486f8.mockapi.io/api/v1/user')
        axios.get('/api/getUsers')
          .then(response => {
            setUsers(response.data);
            setLoading(false);
          })
          .catch(error => {
            setError(error);
            setLoading(false);
          });
      }, []);

    // useEffect(() => {
        
 

    //     // const fetchUsers = async () => {
    //         // try {
    //             // axios.get('http://localhost:3000/getUsers')
    //             // .then(users => (users.data))
    //             // .catch(err => console.log(err))
    //             // // const { data } = await axios.get('/api/users');
    //             // // setUsers(data);
    //             // setLoading(false);
                
    //         // } catch (error) {
    //         //     setError(error.response.data.message || 'Something went wrong');
    //         //     setLoading(false);
    //         // }
    //     // };

    //     // fetchUsers();
    // }, []);

    const deleteUser = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await axios.delete(`/api/getUsers/${id}`);
                setUsers(users.filter((user) => user._id !== id));
            } catch (error) {
                setError(error.response.data.message || 'Something went wrong');
            }
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
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
                                            onClick={() => deleteUser(user._id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                                })
                            }

                    </tbody>
                </Table>

            <Button variant="primary" onClick={logoutHandler}> Logout </Button>
        </div>
    );
};


// onClick={logoutHandler}


export default TeacherDashboard;