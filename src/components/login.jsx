import React, { useState, useEffect } from 'react';
import axios from 'axios';


// const Login = () => {
export default props  => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userData) {
      console.log('Updated userData:', userData);
    }
  }, [userData]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login/', {email, password}, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.status === 200) {
        // On success, set user data (user_id, username, user_role)
        console.log('Login successful:', response.data);
        setUserData(response.data);

        sessionStorage.setItem("user", JSON.stringify(response.data))
        sessionStorage.setItem("user_id", response.data['user_id']);
        sessionStorage.setItem("name", response.data['username']);
        sessionStorage.setItem("password", response.data['password_hash']);
        sessionStorage.setItem("role", response.data['role']);
        sessionStorage.setItem("email", response.data['email']);

        props.onFormSwitch(sessionStorage.getItem("role"))
      }
    } catch (error) {
      if (error.response) {
        // Handle errors from the backend (e.g., invalid credentials)
        setError(error.response.data.message);
      } else {
        // Handle network or other errors
        setError('Something went wrong. Please try again.');
      }
    }
  }  

  return (
    <form onSubmit={handleLogin} className="login-form">
      <div>
        <h2 id="header">Login</h2>

        <div>
            <input type="email" className="inputEntry input-field" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} name="email"/>
            <label class="labelEntry" for="email"></label>
        </div>
        <div id="divider"></div>
        <div>
            <input type="password" className="inputEntry input-field" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} name="password"/>
            <label class="labelEntry" for="password"></label>
        </div>
        <div id="divider"></div>
        <div>
            <button type="submit" className="btn btn-sm blue-button submit-button">LOGIN</button>
        </div>
      </div>
    </form>
  );
};

// export default Login;