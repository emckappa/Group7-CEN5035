import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import AdminCoursesViewer from '../usercomp/admin/AdminCoursesViewer';
import Apply from '../usercomp/ta/TAApply';
import TAViewAssignments from '../usercomp/ta/TAAssignments';
// import Assignments from './Assignments';
// import Applicants from './Applicants';

const TA = () => {
  const [activeSection, setActiveSection] = useState(null);  // State to track the active section
  const userRole = 'ta'; // This can be dynamic, depending on user authentication

  return (
    <div className="ta-page">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        role={userRole}  // Pass user role to Sidebar
      />

      <div className="main-content">
        {/* Conditionally render components based on activeSection */}
        {activeSection === 'courses' && <AdminCoursesViewer />}
        {activeSection === 'assignments' && <TAViewAssignments />}
        {activeSection === 'apply' && <Apply />}
        {activeSection === 'status' && <Status />}
      </div>
    </div>
  );
};


export default TA;

// export default TA;