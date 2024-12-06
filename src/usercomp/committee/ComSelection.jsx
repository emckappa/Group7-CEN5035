import React, { useState } from "react";

const Selection = () => {
  // Static list of TA applicants
  const taList = [
    { id: 1, name: "Applicant One" },
    { id: 2, name: "Bob Smith" },
    { id: 3, name: "Charlie Brown" },
    { id: 4, name: "Diana Lee" },
  ];

  // Static list of courses
  const courses = [
    { id: 1, name: "CS500" },
    { id: 2, name: "CAP5120" }, // duplicate course
    { id: 3, name: "COP3530" },
  ];

  // State for selected course and TA
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedTA, setSelectedTA] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  // Handle course selection
  const handleCourseSelection = (courseId) => {
    setSelectedCourse(courseId);
    setSelectedTA(null); // Reset TA selection on course change
    setConfirmationMessage(null); // Reset confirmation message
  };

  // Handle TA selection
  const handleTASelection = (taId) => {
    const selected = taList.find((ta) => ta.id === taId);
    setSelectedTA(selected);
  };

  // Confirm the selection
  const handleConfirm = () => {
    setConfirmationMessage(
      `${selectedTA.name} has been selected as the TA for ${courses.find(
        (course) => course.id === selectedCourse
      ).name}.`
    );
  };

  // Cancel the selection
  const handleCancel = () => {
    setSelectedCourse(null);
    setSelectedTA(null);
    setConfirmationMessage(null);
  };

  return (
    <div>
      <h2>Select a Course and TA</h2>

      {/* Course selection dropdown */}
      <select
        onChange={(e) => handleCourseSelection(parseInt(e.target.value, 10))}
        value={selectedCourse || ""}
      >
        <option value="" disabled>Select a Course</option>
        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.name}
          </option>
        ))}
      </select>

      {/* TA selection dropdown */}
      {selectedCourse && (
        <div style={{ marginTop: "20px" }}>
          <select
            onChange={(e) => handleTASelection(parseInt(e.target.value, 10))}
            value={selectedTA ? selectedTA.id : ""}
          >
            <option value="" disabled>Select a TA</option>
            {taList.map((ta) => (
              <option key={ta.id} value={ta.id}>
                {ta.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Confirm and Cancel buttons */}
      {selectedTA && (
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={handleConfirm}
            style={{
              backgroundColor: "green",
              color: "white",
              border: "none",
              padding: "10px 20px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            Confirm
          </button>
          <button
            onClick={handleCancel}
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Confirmation message */}
      {confirmationMessage && (
        <div style={{ marginTop: "20px", fontWeight: "bold", color: "green" }}>
          <p>{confirmationMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Selection;
