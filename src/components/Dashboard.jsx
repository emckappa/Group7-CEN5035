import React, { useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RoleBasedNavbar = () => {
  const [userRole, setUserRole] = useState("committee"); // Change for testing
  const navigate = useNavigate();

  return (
    <Navbar bg="light" variant="light" className="flex-column" style={{ width: "250px" }}>
      <Navbar.Brand href="#">My App</Navbar.Brand>
      <Nav className="flex-column">
        <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
        <Nav.Link onClick={() => navigate("/features")}>Features</Nav.Link>
      </Nav>

      <div style={{ marginTop: "20px" }}>
        {/* Admin-only buttons */}
        {userRole === "admin" && (
          <>
            <Button
              variant="primary"
              className="mb-2"
              block
              onClick={() => navigate("/manage-users")}
            >
              Manage Users
            </Button>
            <Button variant="danger" block>
              Admin Settings
            </Button>
          </>
        )}

        {/* Instructor-only buttons */}
        {userRole === "instructor" && (
          <>
            <Button
              variant="success"
              className="mb-2"
              block
              onClick={() => navigate("/assign-tas")}
            >
              Assign TAs
            </Button>
            <Button variant="info" block>
              View Reports
            </Button>
          </>
        )}

        {/* TA Committee-only buttons */}
        {userRole === "committee" && (
          <>
            <Button
              variant="dark"
              className="mb-2"
              block
              onClick={() => navigate("/review-applications")}
            >
              Review Applications
            </Button>
            <Button variant="light" block>
              Approve Assignments
            </Button>
          </>
        )}
      </div>
    </Navbar>
  );
};

export default RoleBasedNavbar;
