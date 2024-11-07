import React, { useState } from 'react';

// const Login = () => {
  export default props  => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("hi")

    if (email == 'TA@gmail.com' && password == '123') {
      // Save login status to localStorage or a global state
      sessionStorage.setItem("userType", "TA");
      console.log(sessionStorage.getItem("userType"))
      props.onFormSwitch('TA')
    } 
    else if (email === 'admin@gmail.com' && password === '123') {
      sessionStorage.setItem("userType", "admin");
      console.log(sessionStorage.getItem("userType"))
      props.onFormSwitch('admin')
    }
    else if (email === 'committee@gmail.com' && password === '123') {
      sessionStorage.setItem("userType", "committee");
      console.log(sessionStorage.getItem("userType"))
      props.onFormSwitch('committee')
    }
    else if (email === 'instructor@gmail.com' && password === '123') {
      sessionStorage.setItem("userType", "instructor");
      console.log(sessionStorage.getItem("userType"))
      props.onFormSwitch('instructor')
    }
    
    else {
      alert('Invalid credentials');
    }
  }

  return (
    <form onSubmit={handleLogin} className="login-form">
      <div>
        <h2 id="header">Login</h2>
        <div>
            <input type="email" class="inputEntry input-field" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} name="email"/>
            <label class="labelEntry" for="email"></label>
        </div>

        <div id="divider"></div>
        <div>
            <input type="password" class="inputEntry input-field" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} name="password"/>
            <label class="labelEntry" for="password"></label>
        </div>
        <div id="divider"></div>
        <div>
            <button type="submit" className="btn btn-lg">LOGIN</button>
        </div>
      </div>
    </form>
  );
};

// export default Login;