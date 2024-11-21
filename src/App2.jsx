
import React, { useState } from 'react';
import './App.css'
import { useAuth0 } from '@auth0/auth0-react';
import AuthButtons from './components/AuthButtons';
import Profile from './components/Profile';

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className='App text-center bg-white'>
      <header>
        <h1>Log-in with MFA</h1>
      </header>

      <div>
        <AuthButtons /> {/* Shows Log In/Log Out button based on authentication status */}
        
        {isAuthenticated ? (
          <Profile /> /* Display Profile component if user is authenticated */
        ) : (
          <p>Use built-in Auth0 for logging-in</p>
        )}
      </div>
    </div>
  );
}

export default App;





