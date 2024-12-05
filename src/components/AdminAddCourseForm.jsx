import React, { useState } from "react";
import { supabase } from "/src/utilities/supabaseClient"; // Ensure your Supabase client is set up correctly

const AdminAddCourseForm = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    courseCode: "",
    courseName: "",
    term: "",
    year: "",
  });

  // State for success or error messages
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear any previous messages

    try {
      const { data, error } = await supabase
        .from("courses") // Replace with your actual table name
        .insert([
          {
            course_code: formData.courseCode,
            course_name: formData.courseName,
            term: formData.term,
            year: parseInt(formData.year), // Ensure the year is a number
          },
        ]);

      if (error) throw error;

      setMessage("Course added successfully!");
      // Reset the form
      setFormData({
        courseCode: "",
        courseName: "",
        term: "",
        year: "",
      });
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h3>Add a New Course</h3>
      {message && (
        <p style={{ color: message.startsWith("Error") ? "red" : "green" }}>
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="courseCode">Course Code:</label>
          <input
            type="text"
            id="courseCode"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="courseName">Course Name:</label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="term">Term:</label>
          <input
            type="text"
            id="term"
            name="term"
            value={formData.term}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AdminAddCourseForm;
