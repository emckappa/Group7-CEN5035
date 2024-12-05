import React from "react";

// Sidebar component
const Sidebar = ({ activeSection, setActiveSection }) => {
  // Handles button click to toggle active section
  const handleButtonClick = (section) => {
    if (activeSection === section) {
      setActiveSection(null); // Hide section if already active
    } else {
      setActiveSection(section); // Show section if it's not active
    }
  };

  return (
    <div className="sidebar">
      <button
        onClick={() => handleButtonClick("courses")}
        className={activeSection === "courses" ? "active" : ""}
      >
        Courses
      </button>
      <button
        onClick={() => handleButtonClick("assignments")}
        className={activeSection === "assignments" ? "active" : ""}
      >
        Assignments
      </button>
      <button
        onClick={() => handleButtonClick("applicants")}
        className={activeSection === "applicants" ? "active" : ""}
      >
        Applicants
      </button>
      <button
        onClick={() => handleButtonClick("status")}
        className={activeSection === "status" ? "active" : ""}
      >
        Status
      </button>
      <button
        onClick={() => handleButtonClick("recommendations")}
        className={activeSection === "recommendations" ? "active" : ""}
      >
        Recommendation
      </button>
    </div>
  );
};

export default Sidebar;