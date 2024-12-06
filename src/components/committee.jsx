import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Import Sidebar component
// import Records from './Records';
// import Status from './Status';

// export default props => {

//   const [selectedTerm, setSelectedTerm] = useState("Spring 2025");

//   const handleSelectChange = (e) => {
//     setSelectedTerm(e.target.value);
//   };

//   return (
    
//     <div style={{ marginTop: "20px" }}>
//     <Form.Select aria-label="Select a term" onChange={handleSelectChange}>
//       <option value="Spring 2025">Spring 2025</option>
//       <option value="Summer 2025">Summer 2025</option>
//       <option value="Fall 2025">Fall 2025</option>
//     </Form.Select>

//   <div style={{ marginTop: "20px" }}>  

//   {selectedTerm === "Spring 2025" && (
//     <Card style={{ width: '50rem' }}>
//       <Card.Body>
//         <Card.Title>Carl  Villarosa</Card.Title>
//         <Card.Text>
//           <p>Role: Student / TA Applicant</p>
//           <p>Major: Computer Science </p>
//           <p>Email: cvillarosa2022@fau.edu</p>
//           <p>GPA: 3.6</p>
//           <Form>
//             {['checkbox'].map((type) => (
//               <div key={`default-${type}`} className="mb-3">
//                 <Form.Check // prettier-ignore
//                   type={type}
//                   id={`default-${type}`}
//                   label={`Class Grade of A`}
//                 /></div>
//             ))}
//             {['checkbox'].map((type) => (
//               <div key={`default-${type}`} className="mb-3">
//                 <Form.Check // prettier-ignore
//                   type={type}
//                   id={`default-${type}`}
//                   label={`Re-applied`}
//                 /></div>
//             ))}
//             {['checkbox'].map((type) => (
//               <div key={`default-${type}`} className="mb-3">
//                 <Form.Check // prettier-ignore
//                   type={type}
//                   id={`default-${type}`}
//                   label={`Relevant Work Experience`}
//                 /></div>
//             ))}
//           </Form>
//         </Card.Text>
//       </Card.Body>
//     </Card>
//     )}


//   {selectedTerm === "Summer 2025" && (
//     <Card style={{ width: '50rem' }}>
//       {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
//       <Card.Body>
//         <Card.Title>Amos Ford</Card.Title>
//         <Card.Text>
//           <p>Role: Student / TA Applicant</p>
//           <p>Major: Computer Science </p>
//           <p>Email: cvillarosa2022@fau.edu</p>
//           <p>GPA: 3.6</p>
//           <Form>
//             {['checkbox'].map((type) => (
//               <div key={`default-${type}`} className="mb-3">
//                 <Form.Check // prettier-ignore
//                   type={type}
//                   id={`default-${type}`}
//                   label={`Class Grade of A`}
//                 /></div>
//             ))}
//             {['checkbox'].map((type) => (
//               <div key={`default-${type}`} className="mb-3">
//                 <Form.Check // prettier-ignore
//                   type={type}
//                   id={`default-${type}`}
//                   label={`Re-applied`}
//                 /></div>
//             ))}
//             {['checkbox'].map((type) => (
//               <div key={`default-${type}`} className="mb-3">
//                 <Form.Check // prettier-ignore
//                   type={type}
//                   id={`default-${type}`}
//                   label={`Relevant Work Experience`}
//                 /></div>
//             ))}
//           </Form>
//         </Card.Text>
//       </Card.Body>
//     </Card>
//   )}

//   {selectedTerm === "Fall 2025" && (
//           <Card style={{ width: "50rem" }}>
//             <Card.Body>
//               <Card.Title>Darian Cheung</Card.Title>
//               <Card.Text>
//                 <p>Role: Student / TA Applicant</p>
//                 <p>Major: Software Engineering </p>
//                 <p>Email: another@applicant.com</p>
//                 <p>GPA: 3.9</p>
//                 <Form>
//                   <Form.Check type="checkbox" label="Class Grade of A" />
//                   <Form.Check type="checkbox" label="Re-applied" />
//                   <Form.Check type="checkbox" label="Relevant Work Experience" />
//                 </Form>
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         )}
  
//     </div>
//   </div>
//   );
// };

// export default Committee;


const Committee = () => {
  const [activeSection, setActiveSection] = useState(null);  // State to track the active section
  const userRole = 'committee'; // This is set to 'committee' for this page, could be dynamic

  return (
    <div className="committee-page">
      {/* Pass the role and activeSection to Sidebar */}
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        role={userRole} 
      />

      <div className="main-content">
        {/* Conditionally render components based on activeSection */}
        {activeSection === 'records' && <Records />}
        {activeSection === 'status' && <Status />}
      </div>
    </div>
  );
};

export default Committee;