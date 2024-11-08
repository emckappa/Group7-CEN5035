// src/Profile.jsx
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    isAuthenticated && (
      <div>
        <h2>Welcome, {user.name}!</h2>
        <p>Email: {user.email}</p>
        <img src={user.picture} alt="Profile" style={{ borderRadius: '50%', width: '100px' }} />
      </div>
    )
  );
}

export default Profile;
