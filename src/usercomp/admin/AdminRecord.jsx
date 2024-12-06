import React from "react";

const RecordsTable = () => {
  // Static records of TA students and their statuses
  const records = [
    { id: 1, name: "Alice Johnson", course: "Course XYZ", term: "Spring 2024", comment: "Highly recommended", status: "Accepted" },
    { id: 2, name: "Bob Smith", course: "Course ABC", term: "Fall 2024", comment: "Average recommendation", status: "Pending" },
    { id: 3, name: "Charlie Brown", course: "Course DEF", term: "Summer 2024", comment: "No recommendation", status: "Declined" },
    { id: 4, name: "Diana Lee", course: "Course GHI", term: "Winter 2024", comment: "Strong recommendation", status: "Accepted" },
    { id: 5, name: "Ethan Harris", course: "Course JKL", term: "Spring 2024", comment: "Pending evaluation", status: "Pending" },
  ];

  // Color code for statuses
  const getStatusStyle = (status) => {
    switch (status) {
      case "Accepted":
        return { color: "green", fontWeight: "bold" };
      case "Declined":
        return { color: "red", fontWeight: "bold" };
      case "Pending":
        return { color: "orange", fontWeight: "bold" };
      default:
        return {};
    }
  };

  return (
    <div>
      <h2>Records Table for TA Applicants</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>TA Name</th>
            <th>Course</th>
            <th>Term</th>
            <th>Comment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.name}</td>
              <td>{record.course}</td>
              <td>{record.term}</td>
              <td>{record.comment}</td>
              <td style={getStatusStyle(record.status)}>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordsTable;
