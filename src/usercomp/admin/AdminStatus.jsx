import React, { useState } from "react";
import RecommendationForm from "./RecommendationForm";

const AdminStatus = () => {
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Sample data
  const applicants = [
    { id: 1, name: "Applicant One", email: "ta@fau.edu" },
    { id: 2, name: "Bob Smith", email: "bob@fau.edu" },
    { id: 3, name: "Charlie Brown", email: "charlie@fau.edu" },
  ];

  const handleOpenForm = (applicant) => {
    setSelectedApplicant(applicant);
    setIsFormOpen(true);
  };

  const handleSubmitRecommendation = (recommendation) => {
    console.log("Recommendation submitted:", recommendation);
    setIsFormOpen(false);
  };

  return (
    <div>
      <h2>TA Applicants for Course CS500 (Summer 2024)</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((applicant) => (
            <tr key={applicant.id}>
              <td>{applicant.name}</td>
              <td>{applicant.email}</td>
              <td>
                <button className="blue-button" onClick={() => handleOpenForm(applicant)}>
                  Open Recommendation Form
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      

      {isFormOpen && selectedApplicant && (
        <RecommendationForm
          applicant={selectedApplicant}
          onSubmit={handleSubmitRecommendation}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminStatus;

