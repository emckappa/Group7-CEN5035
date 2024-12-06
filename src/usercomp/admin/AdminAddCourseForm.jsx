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

// // TA Application Form Component
// const TAApplicationForm = ({ addApplicant }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     major: '',
//     gpa: '',
//     classGrade: false,
//     reApplied: false,
//     relevantExperience: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addApplicant(formData); // Pass the new applicant to the parent component
//     setFormData({
//       name: '',
//       email: '',
//       major: '',
//       gpa: '',
//       classGrade: false,
//       reApplied: false,
//       relevantExperience: false,
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
//       <h3>TA Application Form</h3>
//       <label>
//         <strong>Name:  </strong>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           placeholder="Enter Full Name"
//           required
//         />
//       </label>
//       <br />
//       <label>
//         <strong>Email:  </strong>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Enter Email"
//           required
//         />
//       </label>
//       <br />
//       <label>
//         <strong>Major: </strong>
//         <input
//           type="text"
//           name="major"
//           value={formData.major}
//           onChange={handleChange}
//           placeholder="Enter Major"
//           required
//         />
//       </label>
//       <br />
//       <label>
//         <strong>GPA: </strong>
//         <input
//           type="number"
//           name="gpa"
//           value={formData.gpa}
//           onChange={handleChange}
//           step="0.1"
//           min="0"
//           max="4"
//           placeholder="Enter GPA"
//           required
//         />
//       </label>
//       <br />
//       <fieldset>
//         <legend>Select all that apply:</legend>
//         <label>
//           <input
//             type="checkbox"
//             name="classGrade"
//             checked={formData.classGrade}
//             onChange={handleChange}
//           />
//           Completed the Subject with A Grade
//         </label>
//         <br />
//         <label>
//           <input
//             type="checkbox"
//             name="reApplied"
//             checked={formData.reApplied}
//             onChange={handleChange}
//           />
//           Already Served as a TA for this Subject
//         </label>
//         <br />
//         <label>
//           <input
//             type="checkbox"
//             name="relevantExperience"
//             checked={formData.relevantExperience}
//             onChange={handleChange}
//           />
//           Have Relevant Professional Experience
//         </label>
//       </fieldset>
//       <br />
//       <button type="submit" style={{ marginRight: '10px' }}>Submit</button>
//       <button type="reset" onClick={() => setFormData({
//         name: '',
//         email: '',
//         major: '',
//         gpa: '',
//         classGrade: false,
//         reApplied: false,
//         relevantExperience: false,
//       })}>
//         Reset
//       </button>
//     </form>
//   );
// };

// // TA Applicant Card Component
// const TACard = ({ applicant }) => {
//   return (
//     <div style={{
//       border: '1px solid #ccc',
//       borderRadius: '10px',
//       padding: '15px',
//       marginBottom: '10px',
//       backgroundColor: '#f8f9fa',
//     }}>
//       <h4>{applicant.name}</h4>
//       <p><strong>Email:</strong> {applicant.email}</p>
//       <p><strong>Major:</strong> {applicant.major}</p>
//       <p><strong>GPA:</strong> {applicant.gpa}</p>
//       <fieldset>
//         <legend>Qualifications:</legend>
//         <label>
//           <input type="checkbox" checked={applicant.classGrade} readOnly /> Completed the Subject with A Grade
//         </label>
//         <br />
//         <label>
//           <input type="checkbox" checked={applicant.reApplied} readOnly /> Already Served as a TA for this Subject
//         </label>
//         <br />
//         <label>
//           <input type="checkbox" checked={applicant.relevantExperience} readOnly /> Have Relevant Professional Experience
//         </label>
//       </fieldset>
//     </div>
//   );
// };

// // Main Instructor Component
// const Instructor = () => {
//   const [applicants, setApplicants] = useState([]);

//   const addApplicant = (newApplicant) => {
//     setApplicants([...applicants, newApplicant]);
//   };

//   return (
//     <div>
//       <h2>Instructor Page</h2>
//       <p>Welcome to the Instructor section. Here, you can review TA applications and submitted applicants.</p>
      
//       {/* Form for submitting new applications */}
//       <TAApplicationForm addApplicant={addApplicant} />
//       <hr />
      
//       {/* Displaying list of applicants */}
//       <div>
//         <h3>Submitted TA Applicants</h3>
//         {applicants.length > 0 ? (
//           applicants.map((applicant, index) => (
//             <TACard key={index} applicant={applicant} />
//           ))
//         ) : (
//           <p>No applicants submitted yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Instructor;// // TA Application Form Component
// const TAApplicationForm = ({ addApplicant }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     major: '',
//     gpa: '',
//     classGrade: false,
//     reApplied: false,
//     relevantExperience: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addApplicant(formData); // Pass the new applicant to the parent component
//     setFormData({
//       name: '',
//       email: '',
//       major: '',
//       gpa: '',
//       classGrade: false,
//       reApplied: false,
//       relevantExperience: false,
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
//       <h3>TA Application Form</h3>
//       <label>
//         <strong>Name:  </strong>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           placeholder="Enter Full Name"
//           required
//         />
//       </label>
//       <br />
//       <label>
//         <strong>Email:  </strong>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Enter Email"
//           required
//         />
//       </label>
//       <br />
//       <label>
//         <strong>Major: </strong>
//         <input
//           type="text"
//           name="major"
//           value={formData.major}
//           onChange={handleChange}
//           placeholder="Enter Major"
//           required
//         />
//       </label>
//       <br />
//       <label>
//         <strong>GPA: </strong>
//         <input
//           type="number"
//           name="gpa"
//           value={formData.gpa}
//           onChange={handleChange}
//           step="0.1"
//           min="0"
//           max="4"
//           placeholder="Enter GPA"
//           required
//         />
//       </label>
//       <br />
//       <fieldset>
//         <legend>Select all that apply:</legend>
//         <label>
//           <input
//             type="checkbox"
//             name="classGrade"
//             checked={formData.classGrade}
//             onChange={handleChange}
//           />
//           Completed the Subject with A Grade
//         </label>
//         <br />
//         <label>
//           <input
//             type="checkbox"
//             name="reApplied"
//             checked={formData.reApplied}
//             onChange={handleChange}
//           />
//           Already Served as a TA for this Subject
//         </label>
//         <br />
//         <label>
//           <input
//             type="checkbox"
//             name="relevantExperience"
//             checked={formData.relevantExperience}
//             onChange={handleChange}
//           />
//           Have Relevant Professional Experience
//         </label>
//       </fieldset>
//       <br />
//       <button type="submit" style={{ marginRight: '10px' }}>Submit</button>
//       <button type="reset" onClick={() => setFormData({
//         name: '',
//         email: '',
//         major: '',
//         gpa: '',
//         classGrade: false,
//         reApplied: false,
//         relevantExperience: false,
//       })}>
//         Reset
//       </button>
//     </form>
//   );
// };

// // TA Applicant Card Component
// const TACard = ({ applicant }) => {
//   return (
//     <div style={{
//       border: '1px solid #ccc',
//       borderRadius: '10px',
//       padding: '15px',
//       marginBottom: '10px',
//       backgroundColor: '#f8f9fa',
//     }}>
//       <h4>{applicant.name}</h4>
//       <p><strong>Email:</strong> {applicant.email}</p>
//       <p><strong>Major:</strong> {applicant.major}</p>
//       <p><strong>GPA:</strong> {applicant.gpa}</p>
//       <fieldset>
//         <legend>Qualifications:</legend>
//         <label>
//           <input type="checkbox" checked={applicant.classGrade} readOnly /> Completed the Subject with A Grade
//         </label>
//         <br />
//         <label>
//           <input type="checkbox" checked={applicant.reApplied} readOnly /> Already Served as a TA for this Subject
//         </label>
//         <br />
//         <label>
//           <input type="checkbox" checked={applicant.relevantExperience} readOnly /> Have Relevant Professional Experience
//         </label>
//       </fieldset>
//     </div>
//   );
// };

// // Main Instructor Component
// const Instructor = () => {
//   const [applicants, setApplicants] = useState([]);

//   const addApplicant = (newApplicant) => {
//     setApplicants([...applicants, newApplicant]);
//   };

//   return (
//     <div>
//       <h2>Instructor Page</h2>
//       <p>Welcome to the Instructor section. Here, you can review TA applications and submitted applicants.</p>
      
//       {/* Form for submitting new applications */}
//       <TAApplicationForm addApplicant={addApplicant} />
//       <hr />
      
//       {/* Displaying list of applicants */}
//       <div>
//         <h3>Submitted TA Applicants</h3>
//         {applicants.length > 0 ? (
//           applicants.map((applicant, index) => (
//             <TACard key={index} applicant={applicant} />
//           ))
//         ) : (
//           <p>No applicants submitted yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Instructor;
