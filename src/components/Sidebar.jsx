import React from "react";


const Sidebar = ({ activeSection, setActiveSection, role }) => {
  // Function to handle button clicks and update activeSection
  const handleButtonClick = (section) => {
    if (activeSection === section) {
      setActiveSection(null); // Hide section if already active
    } else {
      setActiveSection(section); // Set new active section
    }
  };

  // Render buttons based on user role
  const renderSidebarButtons = () => {
    switch (role) {
      case 'admin':
        return (
          <>
            <button
              onClick={() => handleButtonClick('courses')}
              className={activeSection === 'courses' ? 'active' : ''}
            >
              Courses
            </button>
            <button
              onClick={() => handleButtonClick('assignments')}
              className={activeSection === 'assignments' ? 'active' : ''}
            >
              Assignments
            </button>
            <button
              onClick={() => handleButtonClick('applicants')}
              className={activeSection === 'applicants' ? 'active' : ''}
            >
              Applicants
            </button>
            <button
              onClick={() => handleButtonClick('status')}
              className={activeSection === 'status' ? 'active' : ''}
            >
              Status
            </button>
            <button
              onClick={() => handleButtonClick('recommendations')}
              className={activeSection === 'recommendations' ? 'active' : ''}
            >
              Recommendations
            </button>
            <button
              onClick={() => handleButtonClick('notifications')}
              className={activeSection === 'notifications' ? 'active' : ''}
            >
              Notifications
            </button>
            <button
              onClick={() => handleButtonClick('records')}
              className={activeSection === 'records' ? 'active' : ''}
            >
              Records
            </button>
          </>
        );
      case 'ta':
        return (
          <>
            <button
              onClick={() => handleButtonClick('courses')}
              className={activeSection === 'courses' ? 'active' : ''}
            >
              Courses
            </button>
            <button
              onClick={() => handleButtonClick('assignments')}
              className={activeSection === 'assignments' ? 'active' : ''}
            >
              Assignments
            </button>
            <button
              onClick={() => handleButtonClick('apply')}
              className={activeSection === 'apply' ? 'active' : ''}
            >
              Apply
            </button>
            <button
              onClick={() => handleButtonClick('status')}
              className={activeSection === 'status' ? 'active' : ''}
            >
              Status
            </button>
          </>
        );
      case 'committee':
        return (
          <>
            <button
              onClick={() => handleButtonClick('recommendations')}
              className={activeSection === 'recommendations' ? 'active' : ''}
            >
              Recommendations
            </button>
            <button
              onClick={() => handleButtonClick('records')}
              className={activeSection === 'records' ? 'active' : ''}
            >
              Records
            </button>
            <button
              onClick={() => handleButtonClick('Selections')}
              className={activeSection === 'selections' ? 'active' : ''}
            >
              Selections
            </button>
          </>
        );
        case 'instructor':
          return (
            <>
              {/* <button
                onClick={() => handleButtonClick('records')}
                className={activeSection === 'records' ? 'active' : ''}
              >
                Courses
              </button> */}
              <button
                onClick={() => handleButtonClick('records')}
                className={activeSection === 'records' ? 'active' : ''}
              >
                Records
              </button>
              {/* <button
                onClick={() => handleButtonClick('status')}
                className={activeSection === 'status' ? 'active' : ''}
              >
                Status
              </button> */}
            </>
          );
      default:
        return (
          <button
            onClick={() => handleButtonClick('login')}
            className={activeSection === 'login' ? 'active' : ''}
          >
            Login
          </button>
        );
    }
  };

  return (
    <div className="sidebar">
      {renderSidebarButtons()}
    </div>
  );
};

export default Sidebar;