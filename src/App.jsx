
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
        <div className="row align-items-center">
          <div className="col-md-12">
        <br />
            <h1>TA Management System</h1>
        <br />
        </div>
        </div>
      </div>
      <div className="row align-items-center justify-content-center">
        <div className="App center col-md-12 justify-content-center">
          <br/>
          <div className="row justify-content-center">
            <div className="button-group blue-button-group col-md-8">
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
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8">
              {formComponents[currentForm] || <Login onFormSwitch={renderForm} />}
            </div>
          </div>
        </div>
      </div>
    </div>  
  )
}

export default App;

