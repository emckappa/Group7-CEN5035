import React, { useState } from "react";

const TAViewAssignments = () => {
  // Static list of TA records (could be passed from the instructor component)
  const records = [
    { course: "CS500", text: "Assigned to grade assignments and assist with labs." },
  ];

  // Static list of courses the TA is assigned to
  const taCourses = [
    { id: 1, name: "CS500" },
    { id: 2, name: "CS600" }, // Assume TA is also assigned to CS600 (if applicable)
  ];

  // State for selected course
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Handle course selection
  const handleCourseSelection = (courseId) => {
    setSelectedCourse(courseId);
  };

  // Filter records for the selected course
  const filteredRecords = records.filter(
    (record) => record.course === taCourses.find((course) => course.id === selectedCourse)?.name
  );

  return (
    <div>
      <h2>Assignments for TA</h2>

      {/* Course selection dropdown */}
      <select
        onChange={(e) => handleCourseSelection(parseInt(e.target.value, 10))}
        value={selectedCourse || ""}
      >
        <option value="" disabled>Select a Course</option>
        {taCourses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.name}
          </option>
        ))}
      </select>

      {/* Display records for the selected course */}
      {selectedCourse && (
        <div style={{ marginTop: "20px" }}>
          <h3>Assignments for {taCourses.find((course) => course.id === selectedCourse)?.name}</h3>
          {filteredRecords.length > 0 ? (
            <ul>
              {filteredRecords.map((record, index) => (
                <li key={index}>
                  <strong>{record.course}:</strong> {record.text}
                </li>
              ))}
            </ul>
          ) : (
            <p>No assignments for this course.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TAViewAssignments;
