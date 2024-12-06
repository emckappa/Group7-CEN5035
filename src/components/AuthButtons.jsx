// src/AuthButtons.jsx
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function AuthButtons() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div >
      {!isAuthenticated ? (
        <button className="btn btn-sm blue-button submit-button" onClick={() => loginWithRedirect()}>
          LOG-IN WITH MFA / 2FA
        </button>
          
      ) : (
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log Out
        </button>
      )}
      <span className="tooltip-container">
      <i className="info-icon" style={{ cursor: 'pointer' }}>ⓘ</i> {/* Info icon */}
      <span className="tooltip-text">Use Auth0 to log in or sign up with Two-factor</span>
      </span>
    </div>
  );
}

export default AuthButtons;
