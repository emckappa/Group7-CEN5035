import React, { useState } from "react";

const RecommendationForm = ({ applicant, onSubmit, onClose }) => {
  const [recommendation, setRecommendation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      applicantId: applicant.id,
      recommendation,
    };
    onSubmit(formData);
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", marginTop: "20px" }}>
      <h3>Recommendation Form for {applicant.name}</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter your recommendation here..."
          value={recommendation}
          onChange={(e) => setRecommendation(e.target.value)}
          rows="5"
          cols="50"
          required
        ></textarea>
        <br />
        <button className="blue-button" type="submit">Submit Recommendation</button>
        <button className="blue-button" type="button" onClick={onClose} style={{ marginLeft: "10px" }}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default RecommendationForm;
