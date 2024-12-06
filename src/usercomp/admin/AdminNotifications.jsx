import React from "react";

const NotificationInbox = () => {
        const handleReply = (id) => {
                alert(`Replying to notification from TA ID: ${id}`);
                // You can replace this with a more complex logic for opening a reply form
              };
              
  // Static list of notifications
  const notifications = [
    {
      id: 1,
      taName: "Alice Johnson",
      course: "Course XYZ",
      term: "Spring 2024",
      status: "Accepted",
      message: "Thank you for the opportunity! I’m excited to join.",
    },
    {
      id: 2,
      taName: "Bob Smith",
      course: "Course ABC",
      term: "Fall 2024",
      status: "Declined",
      message: "Unfortunately, I have other commitments at this time.",
    },
    {
      id: 3,
      taName: "Charlie Brown",
      course: "Course DEF",
      term: "Summer 2024",
      status: "Accepted",
      message: "Looking forward to contributing to the course!",
    },
  ];

  return (
    <div>
      <h2>Notification Inbox</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>TA Name</th>
            <th>Course</th>
            <th>Term</th>
            <th>Status</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification) => (
            <tr key={notification.id}>
              <td>{notification.taName}</td>
              <td>{notification.course}</td>
              <td>{notification.term}</td>
              <td
                style={{
                  color: notification.status === "Accepted" ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {notification.status}
              </td>
              <td>{notification.message}</td>
              <td>
  <button
        className="blue-button"
    onClick={() => handleReply(notification.id)}
    
  >
    Reply
  </button>
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationInbox;
