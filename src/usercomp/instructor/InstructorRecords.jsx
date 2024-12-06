import React, { useState } from "react";

const InstructorRecords = () => {
  // Static list of available TAs
const tas = [
  { id: 1, name: "Applicant One" },
  // { id: 2, name: "Bob Smith" },
  // { id: 3, name: "Charlie Brown" },
  // { id: 4, name: "Diana Lee" },
];

// State for selected TA
const [selectedTA, setSelectedTA] = useState(null);

// Handle TA selection
const handleTASelection = (taId) => {
  const selected = tas.find((ta) => ta.id === taId);
  setSelectedTA(selected);
};

  // Static course list
  const courses = [
    { id: 1, name: "CS500" },
    { id: 2, name: "COP 5616" },
    { id: 3, name: "CAP 7231" },
  ];

  // State for selected course and the TA record
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [record, setRecord] = useState("");
  const [records, setRecords] = useState([]);

  // Handle course selection
  const handleCourseSelection = (courseId) => {
    setSelectedCourse(courseId);
    setRecord(""); // Reset record when course changes
  };

  // Handle record input
  const handleRecordChange = (e) => {
    setRecord(e.target.value);
  };

  // Handle saving the record
  const handleSaveRecord = () => {
    if (record.trim() !== "") {
      const newRecord = {
        course: courses.find((course) => course.id === selectedCourse).name,
        text: record,
      };
      setRecords([...records, newRecord]);
      setRecord(""); // Clear input after saving
    } else {
      alert("Please enter a record.");
    }
  };

  return (
    <div>
      <h2>Add a TA Record for CS500</h2>

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

      
      <select
        onChange={(e) => handleTASelection(parseInt(e.target.value, 10))}
        value={selectedTA ? selectedTA.id : ""}
      >
        <option value="" disabled>Select a TA</option>
        {tas.map((ta) => (
          <option key={ta.id} value={ta.id}>
            {ta.name}
          </option>
        ))}
      </select>

      {/* TA record input */}
      {selectedCourse && (
        <div style={{ marginTop: "20px" }}>
          <textarea
            value={record}
            onChange={handleRecordChange}
            placeholder="Enter the TA record..."
            rows="4"
            cols="50"
            style={{ width: "100%", padding: "10px" }}
          ></textarea>
        </div>
      )}

      {/* Save button */}
      {selectedCourse && record && (
        <button
          onClick={handleSaveRecord}
          style={{
            backgroundColor: "green",
            color: "white",
            border: "none",
            padding: "10px 20px",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          Save Record
        </button>
      )}

      {/* Display saved records */}
      <div style={{ marginTop: "30px" }}>
        <h3>Saved Records for {selectedCourse && courses.find((course) => course.id === selectedCourse)?.name}</h3>
        {records.length > 0 ? (
          <ul>
            {records.map((record, index) => (
              <li key={index}>
                <strong>{record.course}:</strong> {record.text}
              </li>
            ))}
          </ul>
        ) : (
          <p>No records found.</p>
        )}
      </div>
    </div>
  );
};

export default InstructorRecords;
