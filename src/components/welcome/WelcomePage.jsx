import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

const WelcomePage = () => {
    const navigate = useNavigate();

    const handleStudentClick = () => {
        navigate('/login?role=student');
    };

    const handleTeacherClick = () => {
        navigate('/login?role=teacher');
    };

    return (
        <Container className="text-center mt-5">
            <h1>Welcome to Educattions</h1>
            <Button onClick={handleStudentClick} variant="primary" className="m-3">Are you a student?</Button>
            <Button onClick={handleTeacherClick} variant="secondary" className="m-3">Are you a teacher?</Button>
        </Container>
    );
};

export default WelcomePage;