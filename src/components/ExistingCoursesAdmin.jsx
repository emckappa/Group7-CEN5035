import React from "react";

const ExistingCoursesAdmin = () => {
  return (
    <div className="container mt-4">
      {/* Trigger Button */}
      <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        View existing courses
      </button>

      {/* Collapsible Content */}
      <div className="collapse mt-3" id="collapseExample">
        <div className="card card-body">
          {/* TODO: add course list */}
          <div className="accordion" id="coursesAccordion">
            {[
              {
                courseName: "COP 5615: Advanced Operating Systems",
                description:
                  "An in-depth study of modern operating systems, covering distributed systems, concurrency, and security.",
                semester: "Spring 2024",
                instructor: "Dr. Alice Johnson",
                tas: ["John Doe", "Jane Smith", "Michael Lee"],
              },
              {
                courseName: "CAP 5610: Machine Learning Principles",
                description:
                  "A course exploring the fundamentals of machine learning and its real-world applications.",
                semester: "Spring 2024",
                instructor: "Dr. Robert Green",
                tas: ["Emily Rose", "Daniel Brown"],
              },
              {
                courseName: "CNT 5412: Network Security",
                description:
                  "A detailed study of modern security protocols and techniques for networked systems.",
                semester: "Summer 2024",
                instructor: "Dr. Linda White",
                tas: ["Sophia Williams", "Ethan Davis", "Chris Taylor"],
              },
              {
                courseName: "CIS 5370: Cybersecurity Principles",
                description:
                  "Focus on principles and practices for ensuring data and network security.",
                semester: "Fall 2023",
                instructor: "Dr. Mark Black",
                tas: ["Anna Johnson", "David Martin"],
              },
              {
                courseName: "CEN 5035: Software Engineering Concepts",
                description:
                  "A comprehensive introduction to software development processes and methodologies.",
                semester: "Fall 2023",
                instructor: "Dr. Susan Gray",
                tas: ["Ella Brown", "Liam Scott"],
              },
              {
                courseName: "CAP 5771: Data Mining Techniques",
                description:
                  "An exploration of algorithms and techniques for data analysis and pattern recognition.",
                semester: "Spring 2024",
                instructor: "Dr. Kevin Hill",
                tas: ["Mason Green", "Olivia Adams", "Sophia Carter"],
              },
              {
                courseName: "COT 5407: Computational Theory",
                description:
                  "Study of computability, complexity, and algorithmic problem-solving.",
                semester: "Summer 2024",
                instructor: "Dr. Laura King",
                tas: ["Evan Bell", "Ava Nelson"],
              },
              {
                courseName: "CAP 5415: Computer Vision",
                description:
                  "A deep dive into techniques and algorithms for visual data analysis.",
                semester: "Spring 2024",
                instructor: "Dr. Tom Evans",
                tas: ["Jack Miller", "Lily James", "Charlotte White"],
              },
              {
                courseName: "CEN 6016: Advanced Software Engineering",
                description:
                  "Study of advanced topics in software design, quality assurance, and testing.",
                semester: "Fall 2023",
                instructor: "Dr. Rachel Turner",
                tas: ["Henry Moore", "Emily Davis"],
              },
              {
                courseName: "COT 5310: Algorithms and Data Structures",
                description:
                  "Comprehensive coverage of algorithm design and data structure implementation.",
                semester: "Spring 2024",
                instructor: "Dr. Paul Harris",
                tas: ["Lucas Anderson", "Emma Wilson"],
              },
              {
                courseName: "CAP 6701: Artificial Intelligence Principles",
                description:
                  "A foundational course on AI techniques, models, and applications.",
                semester: "Summer 2024",
                instructor: "Dr. Jason Clark",
                tas: ["Noah King", "Harper Scott", "Oliver Thomas"],
              },
              {
                courseName: "COP 5536: Advanced Data Structures",
                description:
                  "A detailed exploration of advanced data structures and their applications.",
                semester: "Spring 2024",
                instructor: "Dr. Sarah Carter",
                tas: ["Sophia Mitchell", "James Parker"],
              },
              {
                courseName: "CIS 6930: Cloud Computing Systems",
                description:
                  "Introduction to the design and management of scalable cloud computing systems.",
                semester: "Fall 2023",
                instructor: "Dr. Peter Gray",
                tas: ["Logan Rivera", "Mia Cooper"],
              },
              {
                courseName: "CDA 5140: Computer Architecture",
                description:
                  "Study of advanced computer architecture concepts, including parallelism and memory systems.",
                semester: "Spring 2024",
                instructor: "Dr. Amy Stewart",
                tas: ["Levi Ross", "Evelyn Murphy"],
              },
              {
                courseName: "CAP 5120: Computer Graphics",
                description:
                  "A course on techniques and algorithms for rendering 3D graphics.",
                semester: "Summer 2024",
                instructor: "Dr. Ryan Taylor",
                tas: ["Benjamin Bailey", "Aria Walker", "Aiden Rivera"],
              },
            ].map((course, index) => (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header" id={`heading${index}`}>
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${index}`}
                    aria-expanded="false"
                    aria-controls={`collapse${index}`}
                  >
                    {course.courseName}
                  </button>
                </h2>
                <div
                  id={`collapse${index}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading${index}`}
                  data-bs-parent="#coursesAccordion"
                >
                  <div className="accordion-body">
                    <p>
                      <strong>Description:</strong> {course.description}
                    </p>
                    <p>
                      <strong>Semester:</strong> {course.semester}
                    </p>
                    <p>
                      <strong>Instructor:</strong> {course.instructor}
                    </p>
                    <h5>Available TA Applicants:</h5>
                    <ul>
                      {course.tas.map((ta, taIndex) => (
                        <li key={taIndex}>
                          <a href="#">{ta}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExistingCoursesAdmin;
