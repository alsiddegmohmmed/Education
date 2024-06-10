import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import CourseList from './components/courses/CourseList.jsx';
import '../i18n.jsx'; // Ensure this import is present

// Import your AuthProvider here
import { AuthProvider } from './components/context/authContext.jsx'; // Replace 'your-auth-library' with the actual library you're using

import App from './App.jsx';
import HomePage from '/src/components/homepage/HomePage.jsx';
import SignupPage from './components/Signup/SignupPage';
import SigninForm from './components/Signin/SigninForm';
import LoginScreen from './components/formsign/LoginScreen';
import RegisterScreen from './components/formsign/RegisterScreen';
import ProfileScreen from './components/formsign/ProfileScreen.jsx';
import WelcomePage from "./components/welcome/WelcomePage.jsx"
import PrivateRoute from './components/PrivateRoute.jsx';
import TeacherDashboard from './components/dashboard/TeacherDashboard.jsx';
import TeacherProfile from './components/formsign/TeacherProfile.jsx';
import AddCoursePage from './components/courses/AddCourseForm.jsx';

import './index.css';

const RootComponent = () => (
  <Provider store={store}>
    <AuthProvider> {/* Wrap your entire application with AuthProvider */}
      <React.StrictMode>
        <Router>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninForm />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/CourseList" element={<CourseList />} />
            <Route path= '' element={<PrivateRoute />}>
              <Route path="/home" element={<HomePage />} />
            </Route>
            <Route path= '' element={<PrivateRoute />}>
              <Route path="/profile" element={<ProfileScreen />} />
            </Route>
            <Route path= '' element={<PrivateRoute />}>
              <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
              <Route path='/teacher-profile' element={<TeacherProfile />} />
              <Route path="/add-course" element={<AddCoursePage />} />
              <Route path="/CourseList" element={<CourseList />} />
            </Route>
            <Route path="*" element={<App />} /> {/* Default route, modify as needed */}
          </Routes>
        </Router>
      </React.StrictMode>
    </AuthProvider>
  </Provider>
);

ReactDOM.createRoot(document.getElementById('root')).render(<RootComponent />);
