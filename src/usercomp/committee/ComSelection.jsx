import React, { useState } from "react";

const ComSelection = () => {
  // Static list of TA applicants and courses
  const taList = [
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
    { id: 3, name: "Charlie Brown" },
    { id: 4, name: "Diana Lee" },
  ];

  const courseList = [
    { id: 1, courseName: "Course XYZ", term: "Spring 2024" },
    { id: 2, courseName: "Course ABC", term: "Fall 2024" },
    { id: 3, courseName: "Course DEF", term: "Summer 2024" },
  ];

  // State to store the selected TA for each course
  const [selections, setSelections] = useState(
    courseList.map((course) => ({ ...course, selectedTA: null }))
  );

  // Handle TA selection
  const handleSelection = (courseId, taId) => {
    setSelections((prevSelections) =>
      prevSelections.map((selection) =>
        selection.id === courseId
          ? { ...selection, selectedTA: taList.find((ta) => ta.id === taId).name }
          : selection
      )
    );
  };

  return (
    <div>
      <h2>TA Selection for Courses</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Course</th>
            <th>Term</th>
            <th>Select TA</th>
            <th>Selected TA</th>
          </tr>
        </thead>
        <tbody>
          {selections.map((course) => (
            <tr key={course.id}>
              <td>{course.courseName}</td>
              <td>{course.term}</td>
              <td>
                <select
                  onChange={(e) =>
                    handleSelection(course.id, parseInt(e.target.value, 10))
                  }
                  value={course.selectedTA ? taList.find((ta) => ta.name === course.selectedTA).id : ""}
                >
                  <option value="" disabled>
                    Select a TA
                  </option>
                  {taList.map((ta) => (
                    <option key={ta.id} value={ta.id}>
                      {ta.name}
                    </option>
                  ))}
                </select>
              </td>
              <td>{course.selectedTA || "Not selected"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "20px" }}>Notifications</h3>
      <ul>
        {selections
          .filter((course) => course.selectedTA)
          .map((course) => (
            <li key={course.id}>
              {course.selectedTA} has been notified about their selection for {course.courseName} ({course.term}).
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ComSelection;
