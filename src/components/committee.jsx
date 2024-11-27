import React, { useState } from 'react';
import {Card, Container, Form, InputGroup} from 'react-bootstrap'


export default props => {
  return (
  <div>
    <h2>TA Committee Page</h2>
    {/* <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Curae quis augue dictum sed velit cras ac maecenas? Adipiscing at mollis euismod in adipiscing. Pharetra mus adipiscing aliquam nullam magna integer. Nibh lacus placerat quam mollis tortor blandit curabitur. Varius faucibus penatibus purus erat blandit odio. Facilisi aptent tempor imperdiet et justo risus!</p>
    <p>Curabitur nostra accumsan ex magna vestibulum fringilla condimentum. Quam molestie mus curae purus integer. Magnis himenaeos iaculis id, interdum volutpat blandit. Vehicula himenaeos magna nascetur sit a placerat himenaeos pharetra habitasse. Pulvinar quis amet tempus elementum cursus tempor sapien sagittis. Suscipit fusce accumsan varius curae aliquam risus dui risus commodo. Varius suspendisse nascetur enim sagittis tellus vivamus etiam odio. Dui rutrum molestie nascetur taciti urna vehicula.</p>
     */}
    <Card style={{ width: '50rem' }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>Carl  Villarosa</Card.Title>
        <Card.Text>
          <p>Role: Student / TA Applicant</p>
          <p>Major: Computer Science </p>
          <p>Email: cvillarosa2022@fau.edu</p>
          <p>GPA: 3.6</p>
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
        <Card.Title>Amos Ford</Card.Title>
        <Card.Text>
          <p>Role: Student / TA Applicant</p>
          <p>Major: Computer Science </p>
          <p>Email: cvillarosa2022@fau.edu</p>
          <p>GPA: 3.6</p>
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
        <Card.Title>Carl  Villarosa</Card.Title>
        <Card.Text>
          <p>Role: Student / TA Applicant</p>
          <p>Major: Computer Science </p>
          <p>Email: cvillarosa2022@fau.edu</p>
          <p>GPA: 3.6</p>
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
  );
};

// export default Committee;