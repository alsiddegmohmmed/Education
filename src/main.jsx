

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import HomePage from '/src/components/homepage/HomePage.jsx'; // Adjust the path if necessary
import SignupPage from './components/Signup/SignupPage';
import SigninForm from './components/Signin/SigninForm';
import LoginScreen from './components/formsign/LoginScreen';
import RegisterScreen from './components/formsign/RegisterScreen';
import ProfileScreen from './components/formsign/ProfileScreen.jsx';
import WelcomePage from "./components/welcome/WelcomePage.jsx"
import './index.css';
import PrivateRoute from './components/PrivateRoute.jsx';
import '/i18n.jsx';
import { Provider } from 'react-redux';
import store from './store.js'

import TeacherDashboard from './components/dashboard/TeacherDashboard.jsx';
import TeacherProfile from './components/formsign/TeacherProfile.jsx';




const RootComponent = () => (
  <Provider store={store}>
  <React.StrictMode>
    <Router>
      <Routes>
        
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
          <Route path= '' element={<PrivateRoute />}>
            <Route path="/home" element={<HomePage />} />
          </Route>
          <Route path= '' element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfileScreen />} />
          </Route>
          <Route path= '' element={<PrivateRoute />}>
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
            <Route path='/teacher-profile' element={<TeacherProfile />} />
          </Route>
          
        <Route path="*" element={<App />} /> {/* Default route, modify as needed */}
      </Routes>
    </Router>
  </React.StrictMode>
  </Provider>
);

ReactDOM.createRoot(document.getElementById('root')).render(<RootComponent />);

