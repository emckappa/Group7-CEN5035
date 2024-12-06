import React, { useState } from "react";

const ComRecommendation = () => {
  // Static list of TA students
  const [taList, setTaList] = useState([
    { id: 1, name: "Applicant One", course: "CS500", term: "Summer 2024", comment: "Highly recommended", status: null },
    { id: 2, name: "Bob Smith", course: "COP 5616", term: "Fall 2024", comment: "Average recommendation", status: null },
    { id: 3, name: "Charlie Brown", course: "CAP 5771", term: "Summer 2024", comment: "No recommendation", status: null },
    { id: 4, name: "Diana Lee", course: "Course GHI", term: "Winter 2024", comment: "Strong recommendation", status: null },
  ]);

  // Handle decision (accept or decline)
  const handleDecision = (id, decision) => {
    setTaList((prevList) =>
      prevList.map((ta) =>
        ta.id === id ? { ...ta, status: decision } : ta
      )
    );
  };

  return (
    <div>
      <h2>TA Applicants Review</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>TA Name</th>
            <th>Course</th>
            <th>Term</th>
            <th>Comment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {taList.map((ta) => (
            <tr key={ta.id}>
              <td>{ta.name}</td>
              <td>{ta.course}</td>
              <td>{ta.term}</td>
              <td>{ta.comment}</td>
              <td>
                <button
                  onClick={() => handleDecision(ta.id, "Accepted")}
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                    marginRight: "5px",
                  }}
                >
                  ACCEPT
                </button>
                <button
                  onClick={() => handleDecision(ta.id, "Declined")}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  DECLINE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "20px" }}>Decisions:</h3>
      <ul>
        {taList
          .filter((ta) => ta.status)
          .map((ta) => (
            <li key={ta.id}>
              {ta.name} ({ta.course}, {ta.term}): **{ta.status}**
            </li>
          ))}
      </ul>
    </div>
  );
};


export default ComRecommendation;
