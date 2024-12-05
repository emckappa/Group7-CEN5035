import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

export default props => {
  const user = JSON.parse(sessionStorage.getItem("user"))
  // Function to switch between sections in the sidebar
  const handleSectionSwitch = (section) => {
    setCurrentSection(section);
  };
  const [activeSection, setActiveSection] = useState(null);

  return (
    
    <div>
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <h2>TA Page</h2>
      <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Curae quis augue dictum sed velit cras ac maecenas? Adipiscing at mollis euismod in adipiscing. Pharetra mus adipiscing aliquam nullam magna integer. Nibh lacus placerat quam mollis tortor blandit curabitur. Varius faucibus penatibus purus erat blandit odio. Facilisi aptent tempor imperdiet et justo risus!</p>
      <p>Curabitur nostra accumsan ex magna vestibulum fringilla condimentum. Quam molestie mus curae purus integer. Magnis himenaeos iaculis id, interdum volutpat blandit. Vehicula himenaeos magna nascetur sit a placerat himenaeos pharetra habitasse. Pulvinar quis amet tempus elementum cursus tempor sapien sagittis. Suscipit fusce accumsan varius curae aliquam risus dui risus commodo. Varius suspendisse nascetur enim sagittis tellus vivamus etiam odio. Dui rutrum molestie nascetur taciti urna vehicula.</p>
      <p>Dolor metus efficitur nullam curabitur lobortis bibendum porta cras. Imperdiet vehicula tempor neque fusce quam. Leo turpis penatibus dictumst; congue varius ultrices blandit fermentum. Ac aptent cubilia et ante enim molestie? Tempor malesuada pharetra porttitor; nibh tellus neque penatibus. Suspendisse varius bibendum id; feugiat sem habitasse. Fermentum habitant lacus arcu lectus amet ultrices tempus velit blandit. Mollis est penatibus massa ut rutrum lacus per pharetra. Pellentesque eros suspendisse; cursus nunc urna fusce. Fringilla euismod adipiscing lobortis ante tellus commodo pulvinar.</p>
      
      <div>
        Username: {user.username},
        Password: {user.password_hash},
        Email: {user.email},
        Role: {user.role}
      </div>
    </div>
  );
};

// export default TA;