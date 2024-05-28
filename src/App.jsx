import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';
function App() {
  return (
    <>
      <Navbar />
      <ToastContainer />
      {/* Any additional components or structure for the App */}
      <Footer />
    </>
  );
}

export default App;
