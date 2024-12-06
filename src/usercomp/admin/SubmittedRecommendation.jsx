import React from "react";

const SubmittedRecommendation = () => {
  // Static list of TA students
  const taList = [
    { id: 1, name: "Alice Johnson", course: "Course XYZ", term: "Spring 2024", comment: "Highly recommended" },
    { id: 2, name: "Bob Smith", course: "Course ABC", term: "Fall 2024", comment: "Average recommendation" },
    { id: 3, name: "Charlie Brown", course: "Course DEF", term: "Summer 2024", comment: "No recommendation" },
    { id: 4, name: "Diana Lee", course: "Course GHI", term: "Winter 2024", comment: "Strong recommendation" },
  ];

  return (
    <div>
      <h2>TA Applicants List</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>TA Name</th>
            <th>Course</th>
            <th>Term</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {taList.map((ta) => (
            <tr key={ta.id}>
              <td>{ta.name}</td>
              <td>{ta.course}</td>
              <td>{ta.term}</td>
              <td>{ta.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmittedRecommendation;
