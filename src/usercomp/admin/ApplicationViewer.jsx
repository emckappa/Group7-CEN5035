import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApplicationViewer = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/applications/'); // Replace with your backend endpoint
      const application = response.data

      const updateApps = await Promise.all(
        application.map(async (application) => {
          const [userResponse, courseResponse] = await Promise.all([
            await axios.get(`http://localhost:8000/api/users/${application.applicant_id}`),
            await axios.get(`http://localhost:8000/api/courses/${application.course_id}`)
          ]);

          return {
            ... application,
            applicant_id: userResponse.data.username,
            course_id: courseResponse.data.course_code
          };
        })
      );

      setApplications(updateApps); // Set data from backend
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Failed to fetch applications');
    }
  };

  return (
    <div>
      <h3>View Applications</h3>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : applications.length > 0 ? (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Applicant</th>
              <th>Course Code</th>
              <th>Status</th>
              <th>Submission Date</th>
              <th>CV Link</th>
              <th>Statement</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.application_id}>
                <td>{application.application_id}</td>
                <td>{application.applicant_id}</td>
                <td>{application.course_id}</td>
                <td>{application.status}</td>
                <td>{application.submission_date}</td>
                <td>
                  {application.cv_link ? (
                    <a href={application.cv_link} target="_blank" rel="noopener noreferrer">
                      View CV
                    </a>
                  ) : (
                    'N/A'
                  )}
                </td>
                <td>{application.statement || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No applications found.</p>
      )}
    </div>
  );
};

export default ApplicationViewer;
