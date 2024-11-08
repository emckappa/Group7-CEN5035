
import React, { useState } from 'react';
import Login from './components/login';
import TA from './components/TA'
import Admin from './components/admin'
import Committee from './components/committee'
import Instructor from './components/instructor'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useAuth0 } from '@auth0/auth0-react';
import AuthButtons from './components/AuthButtons';
import Profile from './components/Profile';

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className='App text-center bg-warning'>
      <header>
        <h1>TA Management Dashboard</h1>
      </header>

      <div>
        <AuthButtons /> {/* Shows Log In/Log Out button based on authentication status */}
        
        {isAuthenticated ? (
          <Profile /> /* Display Profile component if user is authenticated */
        ) : (
          <p>Please log in to access your profile and other features.</p>
        )}
      </div>
    </div>
  );
}

export default App;





