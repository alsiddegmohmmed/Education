import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from './FormContainer';
import Loader from "../Loader";
import { useRegisterMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import React from 'react';

const RegisterScreen = () => {
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 
    const { userInfo } = useSelector((state) => state.auth); 
    const [register, { isLoading }] = useRegisterMutation(); 

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

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

        if (!name) {
            setNameError('Name is required.');
            isValid = false;
        } else {
            setNameError('');
        }

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

        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
            isValid = false;
        } else {
            setConfirmPasswordError('');
        }

        if (isValid) {
            try {
                const res = await register({ name, email, password }).unwrap(); 
                dispatch(setCredentials({ ...res }));
                navigate('/');
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
        <>
        
       
        <FormContainer>
            <h1>Sign Up</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="my-2" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type='text'
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                    {nameError && <div style={{ color: 'red' }}>{nameError}</div>}
                </Form.Group>

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

                <Form.Group className="my-2" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type='password'
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                    {confirmPasswordError && <div style={{ color: 'red' }}>{confirmPasswordError}</div>}
                </Form.Group>

                {isLoading && <Loader />}

                <Button type="submit" variant="primary" className="mt-3">
                    Sign Up
                </Button>
              
                <Row className="py-3">
                    <Col>
                        Already have an account? <Link to='/login'>Login here</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
        </>
    );
}

export default RegisterScreen;
