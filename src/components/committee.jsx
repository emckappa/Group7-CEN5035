import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Card, Form, Button } from "react-bootstrap";

const Committee = () => {
  const [activeSection, setActiveSection] = useState(null); // State to track the active section
  const [selectedTerm, setSelectedTerm] = useState("Spring 2025"); // State for term selection
  const [applications, setApplications] = useState([]); // State to hold applications
  const [selectedApplication, setSelectedApplication] = useState(null); // State for selected application

  const userRole = "committee"; // This is set to 'committee' for this page

  const handleSelectChange = (e) => {
    setSelectedTerm(e.target.value);
    // Simulate fetching applications for the selected term
    const fetchedApplications = [
      {
        id: 1,
        name: "Carl Villarosa",
        role: "Student / TA Applicant",
        major: "Computer Science",
        email: "cvillarosa2022@fau.edu",
        gpa: 3.6,
        term: "Spring 2025",
        qualifications: ["Class Grade of A", "Re-applied", "Relevant Work Experience"],
      },
      {
        id: 2,
        name: "Amos Ford",
        role: "Student / TA Applicant",
        major: "Computer Science",
        email: "amosford@fau.edu",
        gpa: 3.5,
        term: "Summer 2025",
        qualifications: ["Class Grade of A", "Re-applied"],
      },
      {
        id: 3,
        name: "Darian Cheung",
        role: "Student / TA Applicant",
        major: "Software Engineering",
        email: "dariancheung@applicant.com",
        gpa: 3.9,
        term: "Fall 2025",
        qualifications: ["Class Grade of A", "Relevant Work Experience"],
      },
    ];
    setApplications(fetchedApplications.filter(app => app.term === e.target.value));
  };

  const handleSelectTA = (applicationId) => {
    setSelectedApplication(applicationId);
    // Simulate sending the selected application to the backend
    console.log(`Selected TA application ID: ${applicationId}`);
    alert("TA has been successfully selected for the course!");
  };

  return (
    <div className="committee-page">
      {/* Sidebar for navigation */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} role={userRole} />

      <div className="main-content" style={{ marginTop: "20px" }}>
        {/* Term Selection Dropdown */}
        <Form.Select aria-label="Select a term" onChange={handleSelectChange}>
          <option value="Spring 2025">Spring 2025</option>
          <option value="Summer 2025">Summer 2025</option>
          <option value="Fall 2025">Fall 2025</option>
        </Form.Select>

        <div style={{ marginTop: "20px" }}>
          {/* Render Applications */}
          {applications.map((application) => (
            <Card key={application.id} style={{ width: "50rem", marginBottom: "20px" }}>
              <Card.Body>
                <Card.Title>{application.name}</Card.Title>
                <Card.Text>
                  <p>Role: {application.role}</p>
                  <p>Major: {application.major}</p>
                  <p>Email: {application.email}</p>
                  <p>GPA: {application.gpa}</p>
                  <Form>
                    {application.qualifications.map((qualification, index) => (
                      <Form.Check
                        key={index}
                        type="checkbox"
                        label={qualification}
                        defaultChecked
                        disabled
                      />
                    ))}
                  </Form>
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleSelectTA(application.id)}
                  disabled={selectedApplication === application.id}
                >
                  {selectedApplication === application.id ? "Selected as TA" : "Select as TA"}
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Committee;
