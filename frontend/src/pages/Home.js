import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import './home.css'; 
import brain from '../assets/Brain.jpeg';
import spine from '../assets/spine.jpeg';
import abdominal from '../assets/abdominal.jpg';
import cardiac from '../assets/Cardic.webp';


function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const startSimulation = (anatomy) => {
    alert(`Starting MRI simulation for the ${anatomy}`);
    
  };

  return (
    <div className="home-body">
      
    <div className="container">
      <h1>Welcome to the MRI Simulator, {loggedInUser}</h1>
      <p>Select an anatomy to start the MRI simulation:</p>

      <div className="anatomy-selection">
        <div className="anatomy-card" onClick={() => startSimulation('brain')}>
          <img src={brain} alt="Brain" />
          
        </div>
        <div className="anatomy-card" onClick={() => startSimulation('spine')}>
          <img src={spine} alt="Spine" />
          
        </div>
        <div className="anatomy-card" onClick={() => startSimulation('abdominal')}>
          <img src={abdominal} alt="Abdominal" />
         
        </div>
        <div className="anatomy-card" onClick={() => startSimulation('cardiac')}>
          <img src={cardiac} alt="Cardiac" />
          
        </div>
       
      </div>

      <button onClick={handleLogout} className="logout-btn">Logout</button>
      <ToastContainer />
    </div>
  </div>
);
}

export default Home;