import React from 'react';
import { useNavigate } from 'react-router-dom';

export default Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === 'TA' && password === 'password') {
      // Save login status to localStorage or a global state
      localStorage.setItem("userType", "TA");
      // Redirect to the landing page
      navigate('/TA');
    } else {
      alert('Invalid credentials');
    }
  }

  return (
    <div>
      <h2 id="header">Login</h2>
      <row>
          <input type="email" class="inputEntry input-field" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} name="email"/>
          <label class="labelEntry" for="email"></label>
      </row>

      <div id="divider"></div>
      <row>
          <input type="password" class="inputEntry input-field" id="password" placeholder="Password" onChange={(e) => setPass(e.target.value)} name="password"/>
          <label class="labelEntry" for="password"></label>
      </row>
      <div id="divider"></div>
      <row>
          <button type="submit" className="btn btn-lg">LOGIN</button>
      </row>
    </div>
  );
};

// export default Login;