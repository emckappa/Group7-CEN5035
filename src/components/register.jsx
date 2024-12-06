import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default props => {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password_hash, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
      if (userData) {
        console.log('Updated userData:', userData);
      }
    }, [userData]);

    const handleRegister = async (e) => {
      e.preventDefault();

      try {
        const response = await axios.post('http://localhost:8000/api/users/create/', {username, email, password_hash, role}, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.status === 201) {
          console.log('Registration successful:', response.data);
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
      <div>
        <h2>Registration Page</h2>
        <form onSubmit={handleRegister} className="login-form">
          <div class="container" id="auth-block">
            <div>
              <input type="username" className="inputEntry input-field" id="username" placeholder="Name" onChange={(e) => setName(e.target.value)} name="username"/>
              <label class="labelEntry" for="username"></label>
            </div>

            <div id="divider"></div>

            <div>
              <input type="email" className="inputEntry input-field" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} name="email"/>
              <label class="labelEntry" for="email"></label>
            </div>

            <div id="divider"></div>
            <div>
              <input type="password" className="inputEntry input-field" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} name="password"/>
              <label class="labelEntry" for="password"></label>
            </div>

            <div id="radioUser">
              <div class="row">
                <div class="col-6 custom-control custom-radio custom-control-inline">
                  <input type="radio" onClick={(e) => setRole(e.target.value)} id="TA" name="role" class="custom-control-input" value="TA Applicant"/>
                  <label class="custom-control-label" for="TA">TA</label>
                </div>

                <div class="col-6 custom-control custom-radio custom-control-inline">
                  <input type="radio" onClick={(e) => setRole(e.target.value)} id="committee" name="role" class="custom-control-input" value="TA Committee Member"/>
                  <label class="custom-control-label" for="committee">TA Committee Member</label>
                </div>

                <div class="col-6 custom-control custom-radio custom-control-inline">
                  <input type="radio" onClick={(e) => setRole(e.target.value)} id="admin" name="role" class="custom-control-input" value="Administrator"/>
                  <label class="custom-control-label" for="admin">Administrator</label>
                </div>

                <div class="col-6 custom-control custom-radio custom-control-inline">
                  <input type="radio" onClick={(e) => setRole(e.target.value)} id="instructor" name="role" class="custom-control-input" value="Instructor"/>
                  <label class="custom-control-label" for="instructor">Instructor</label>
                </div>
              </div>
            </div>

            <div>
              <button type="submit" className="btn btn-sm blue-button submit-button">SIGN UP</button>
            </div>
              
          </div>
        </form>
      </div>
    );
  };
  
  // export default TA;