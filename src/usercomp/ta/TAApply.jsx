import React, { useState, useEffect } from 'react';
import axios from 'axios';

// TA Application Form Component
const TAApplicationForm = ({ addApplicant }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    major: '',
    gpa: '',
    course: '',
    classGrade: false,
    reApplied: false,
    relevantExperience: false,
  });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch the course list when the component mounts
    console.log(sessionStorage.getItem("user_id"))
    const getCourseList = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/courses');  // Replace with your API endpoint
        setCourses(response.data);  // Assuming the API returns a list of courses
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    getCourseList();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const applicant_id = sessionStorage.getItem("user_id")
    const course_id = formData.course
    const status = "Submitted"

    try {
      const response = await axios.post('http://localhost:8000/api/applications/create/', {applicant_id, course_id, status}, {
        headers: {'Content-Type': 'application/json',},
      });
      
      if (response.status === 201) {
        console.log('Application Submittted:', response.data);
        setFormData({
          name: '',
          email: '',
          major: '',
          gpa: '',
          course: '',
          classGrade: false,
          reApplied: false,
          relevantExperience: false,
        });
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h3>TA Application Form</h3>
      <label>
        <strong>Name:  </strong>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter Full Name"
          required
        />
      </label>
      <br />
      <label>
        <strong>Email:  </strong>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Email"
          required
        />
      </label>
      <br />
      <label>
        <strong>Major: </strong>
        <input
          type="text"
          name="major"
          value={formData.major}
          onChange={handleChange}
          placeholder="Enter Major"
          required
        />
      </label>
      <br />
      <label>
        <strong>GPA: </strong>
        <input
          type="number"
          name="gpa"
          value={formData.gpa}
          onChange={handleChange}
          step="0.1"
          min="0"
          max="4"
          placeholder="Enter GPA"
          required
        />
      </label>
      <br />
      <label>
        <strong>Course: </strong>
        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
        >
          <option value="">Select Course</option>
          {courses.map(course => (
            <option key={course.course_id} value={course.course_id}>{course.course_code}</option>
          ))}
        </select>
      </label>
      <br />
      <fieldset>
        <legend>Select all that apply:</legend>
        <label>
          <input
            type="checkbox"
            name="classGrade"
            checked={formData.classGrade}
            onChange={handleChange}
          />
          Completed the Subject with A Grade
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="reApplied"
            checked={formData.reApplied}
            onChange={handleChange}
          />
          Already Served as a TA for this Subject
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="relevantExperience"
            checked={formData.relevantExperience}
            onChange={handleChange}
          />
          Have Relevant Professional Experience
        </label>
      </fieldset>
      <br />
      <button type="submit" style={{ marginRight: '10px' }}>Submit</button>
      <button type="reset" onClick={() => setFormData({
        name: '',
        email: '',
        major: '',
        gpa: '',
        courseCode: '',
        classGrade: false,
        reApplied: false,
        relevantExperience: false,
      })}>
        Reset
      </button>
    </form>
  );
};

// Main Instructor Component
const Apply = () => {
  const [applicants, setApplicants] = useState([]);

  const addApplicant = (newApplicant) => {
    setApplicants([...applicants, newApplicant]);
  };

  return (
    <div>
      {/* Form for submitting new applications */}
      <TAApplicationForm addApplicant={addApplicant} />
      <hr />
    </div>
  );
};

export default Apply;