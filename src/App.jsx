import { useState } from 'react'
import Login from './components/login';
import TA from './components/TA'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const [currentForm, setCurrentForm] = useState('login');

    const renderForm = () => {
        switch(currentForm) {
          case 'login':
            return (
              // <div className="form-container">
              //   <h2>Login Form</h2>
              //   <input type="email" placeholder="Email" className="input-field" />
              //   <input type="password" placeholder="Password" className="input-field" />
              //   <button className="submit-btn">Login</button>
              // </div>
              <Login />
            );
        //   case 'TA':
        //     return (
        //       <div className="form-container">
        //         <h2>Register Form</h2>
        //         <input type="text" placeholder="Full Name" className="input-field" />
        //         <input type="email" placeholder="Email" className="input-field" />
        //         <input type="password" placeholder="Password" className="input-field" />
        //         <input type="password" placeholder="Confirm Password" className="input-field" />
        //         <button className="submit-btn">Register</button>
        //       </div>
        //     );
          default:
            return null
        }
    };

  return (
    <div className='App'>
      <h1>TA Management System</h1>
      <div className="button-group">
          <button onClick={() => setCurrentForm('login')} className={currentForm === 'login' ? 'active' : ''}>
            Login
          </button>
          <button onClick={() => setCurrentForm('register')} className={currentForm === 'register' ? 'active' : ''}>
            Register
          </button>
      </div>
      {renderForm()}
    </div>
      
  )
}

export default App