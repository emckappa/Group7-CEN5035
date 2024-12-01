import React, { useState } from 'react';
import {Card, Container, Form, InputGroup} from 'react-bootstrap'
import AddCourseForm from '/src/components/AddCourseForm';
import ExistingCoursesAdmin from '/src/components/ExistingCoursesAdmin';

export default props => {
  return (
  <div>
    <h2>TA Admin Page</h2>
    <p>Admin role will be able to view existing courses, add new courses, and recommend available TAs for open courses</p>
    <p>TODO: Add existing courses, add course, and unassigned applicants</p>
     
    <div>
      <h2>Existing Courses</h2>
      <p>Click to view list of existing courses and status.</p>
      <ExistingCoursesAdmin />
    </div>
    <div>
      <h2>Course Entry</h2>
      <p>Use the below form to instert new courses. </p>
      <p>TODO: Update form to match course requirements. </p>
      <AddCourseForm />
    </div>
    <div style={{margin: "auto" }}>
      <h2>Available TAs</h2>
      <Card style={{ width: '50rem' }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title>John Jacob</Card.Title>
          <Card.Text>
            <p>Role: Student / TA Applicant</p>
            <p>Major: Computer Science </p>
            <p>Email: johnjacob@fau.edu</p>
            <p>GPA: 3.8</p>
            <p>View full profile: <a href="#">TA Profile</a> </p>
            <Form>
              {['checkbox'].map((type) => (
                <div key={`default-${type}`} className="mb-3">
                  <Form.Check // prettier-ignore
                    type={type}
                    id={`default-${type}`}
                    label={`Class Grade of A`}
                  /></div>
              ))}
              {['checkbox'].map((type) => (
                <div key={`default-${type}`} className="mb-3">
                  <Form.Check // prettier-ignore
                    type={type}
                    id={`default-${type}`}
                    label={`Re-applied`}
                  /></div>
              ))}
              {['checkbox'].map((type) => (
                <div key={`default-${type}`} className="mb-3">
                  <Form.Check // prettier-ignore
                    type={type}
                    id={`default-${type}`}
                    label={`Relevant Work Experience`}
                  /></div>
              ))}
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>

      <Card style={{ width: '50rem' }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title>Tom Smith</Card.Title>
          <Card.Text>
            <p>Role: Student / TA Applicant</p>
            <p>Major: Computer Science </p>
            <p>Email: tomsmith@fau.edu</p>
            <p>GPA: 3.75</p>
            <p>View full profile: <a href="#">TA Profile</a> </p>
            <Form>
              {['checkbox'].map((type) => (
                <div key={`default-${type}`} className="mb-3">
                  <Form.Check // prettier-ignore
                    type={type}
                    id={`default-${type}`}
                    label={`Class Grade of A`}
                  /></div>
              ))}
              {['checkbox'].map((type) => (
                <div key={`default-${type}`} className="mb-3">
                  <Form.Check // prettier-ignore
                    type={type}
                    id={`default-${type}`}
                    label={`Re-applied`}
                  /></div>
              ))}
              {['checkbox'].map((type) => (
                <div key={`default-${type}`} className="mb-3">
                  <Form.Check // prettier-ignore
                    type={type}
                    id={`default-${type}`}
                    label={`Relevant Work Experience`}
                  /></div>
              ))}
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>

    </div>
  
  </div>
  );
};

// export default Committee;