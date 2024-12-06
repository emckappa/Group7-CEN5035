import React, { useState, useEffect } from "react";
import { supabase } from "/src/utilities/supabaseClient";

const AdminApplicationViewer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Fetch applications with applicant_id and course_id resolved
        const { data: applications, error: applicationsError } = await supabase
          .from("applications")
          .select(
            `application_id, 
             applicant_id, 
             course_id, 
             status, 
             submission_date, 
             cv_link, 
             statement, 
             users (name), 
             courses (course_code)`
          );

        if (applicationsError) throw applicationsError;

        // Transform data to replace applicant_id and course_id with resolved values
        const formattedData = applications.map((app) => ({
          application_id: app.application_id,
          applicant_name: app.users?.name || "Unknown", // Replace with name
          course_code: app.courses?.course_code || "Unknown", // Replace with course_code
          status: app.status,
          submission_date: app.submission_date,
          cv_link: app.cv_link,
          statement: app.statement,
        }));

        setData(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h3>Applications from Database</h3>
      <p>Pulling from applicants, courses, and users</p>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Application ID</th>
            <th>Applicant Name</th>
            <th>Course Code</th>
            <th>Status</th>
            <th>Submission Date</th>
            <th>CV Link</th>
            <th>Statement</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.application_id}</td>
              <td>{item.applicant_name}</td>
              <td>{item.course_code}</td>
              <td>{item.status}</td>
              <td>{item.submission_date}</td>
              <td>
                <a href={item.cv_link} target="_blank" rel="noopener noreferrer">
                  View CV
                </a>
              </td>
              <td>{item.statement}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminApplicationViewer;
