import React, { useState } from 'react';
import Login from './components/login';
import TA from './components/TA'
import Admin from './components/admin'
import Committee from './components/committee'
import Instructor from './components/instructor'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const [currentForm, setCurrentForm] = useState('login');

    const renderForm = () => {
      if (sessionStorage.getItem("userType") === "TA"){
        setCurrentForm("TA")
      }
      else if (sessionStorage.getItem("userType") === "admin"){
        setCurrentForm("admin")
      }
      else if (sessionStorage.getItem("userType") === "committee"){
        setCurrentForm("committee")
      }
      else if (sessionStorage.getItem("userType") === "instructor"){
        setCurrentForm("instructor")
      }

      switch(currentForm) {
        case 'login':
          return (
            <Login />
          );
        case 'TA':
          return (
            <TA />
          );
        case 'admin':
          return (
            <Admin />
          );
        case 'committee':
          return (
            <Committee />
          );
        case 'instructor':
          return (
            <Instructor />
          );
        default:
          return null
      }
    };
    const formComponents = {
      login: <Login onFormSwitch={renderForm} />,
      TA: <TA onFormSwitch={renderForm} />,
      admin: <Admin onFormSwitch={renderForm} />,
      committee: <Committee onFormSwitch={renderForm} />,
      instructor: <Instructor onFormSwitch={renderForm} />
    };

  return (
    <div className="container-fluid">
    <div className="page-title align-items-center justify-content-center container-fluid">
            <br />
            <h1>TA Management System</h1>
            <br />
          </div>
      <div className="d-flex flex-wrap align-items-center justify-content-center">
        <div className='App'>
          <br/>
          <div className="button-group">
              <button onClick={() => setCurrentForm('login')} className={currentForm === 'login' ? 'active' : ''}>
                Login
              </button>
              <button onClick={() => setCurrentForm('TA')} className={currentForm === 'TA' ? 'active' : ''}>
                TA
              </button>
              <button onClick={() => setCurrentForm('admin')} className={currentForm === 'admin' ? 'active' : ''}>
                Admin
              </button>
              <button onClick={() => setCurrentForm('committee')} className={currentForm === 'committee' ? 'active' : ''}>
                Committee
              </button>
              <button onClick={() => setCurrentForm('instructor')} className={currentForm === 'instructor' ? 'active' : ''}>
                Instructor
              </button>
          </div>
          {formComponents[currentForm] || <Login onFormSwitch={renderForm} />}
        </div>
      </div>
    </div>  
  )
}

export default App;