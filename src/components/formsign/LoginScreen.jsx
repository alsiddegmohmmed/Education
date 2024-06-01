import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLoginMutation } from "../../slices/usersApiSlice";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from "./FormContainer";
import { setCredentials } from "../../slices/authSlice";
import React from 'react';
import Loader from "../Loader";

const LoginScreen = () => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 
    const location = useLocation();

    const [login, { isLoading }] = useLoginMutation(); 
    const { userInfo } = useSelector((state) => state.auth); 

    useEffect(() => {
        if (userInfo) {
            const params = new URLSearchParams(location.search);
            const role = params.get('role');
            if (role === 'teacher') {
                navigate('/teacher-dashboard');
            } else {
                navigate('/home');
            }
        }
    }, [navigate, userInfo, location.search]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        if (newEmail && !validateEmail(newEmail)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        let isValid = true;

        if (!email) {
            setEmailError('Email is required.');
            isValid = false;
        } else if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError('Password is required.');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (isValid) {
            try {
                const res = await login({ email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                const params = new URLSearchParams(location.search);
                const role = params.get('role');
                if (role === 'teacher') {
                    navigate('/teacher-dashboard');
                } else {
                    navigate('/home');
                }
            } catch (err) {
                const errorMessage = err?.data?.message || err.error;
                if (errorMessage.includes("email")) {
                    setEmailError(errorMessage);
                } else {
                    setPasswordError(errorMessage);
                }
            }
        }
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="my-2" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        type='email'
                        placeholder="Enter email"
                        value={email}
                        onChange={handleEmailChange}
                    ></Form.Control>
                    {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
                </Form.Group>

                <Form.Group className="my-2" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type='password'
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                    {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
                </Form.Group>

                {isLoading && <Loader />}

                <Button type="submit" variant="primary" className="mt-3">
                    Sign In
                </Button>

                <Row className="py-3">
                    <Col>
                        New customer? <Link to='/register'>Register</Link>
                    </Col>
                </Row>
                <Row className="py-3">
                    <Col>
                        Click here to go<Link to ='/'  style={{ color: 'blue' }}> back</Link> 
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    );
}

export default LoginScreen;
