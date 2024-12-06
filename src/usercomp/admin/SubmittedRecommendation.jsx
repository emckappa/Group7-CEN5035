import React from "react";

const SubmittedRecommendations = ({ course, term, recommendations }) => {
  return (
    <div>
      <h2>Submitted Recommendations for {course} ({term})</h2>

      {recommendations.length > 0 ? (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Applicant Name</th>
              <th>Email</th>
              <th>Recommendation</th>
            </tr>
          </thead>
          <tbody>
            {recommendations.map((rec) => (
              <tr key={rec.applicantId}>
                <td>{rec.name}</td>
                <td>{rec.email}</td>
                <td>{rec.recommendation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No recommendations have been submitted for this course yet.</p>
      )}
    </div>
  );
};

export default SubmittedRecommendations;
