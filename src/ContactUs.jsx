import React from 'react';
import './ContactUs.css';


function ContactUs() {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>We'd love to hear from you! Reach out to us through any of the following ways:</p>
      <div className="contact-info">
        <p><strong>Email:</strong> jnanaprakash2002@gmail.com</p>
        <p><strong>Phone:</strong> +91-8985653771</p>
        <p><strong>Address:</strong> #143, Fresh Market Street, AmeerpetHyderabad, India</p>
      </div>
      <div className="contact-icons">
        <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="Email Icon" />
        <img src="https://cdn-icons-png.flaticon.com/512/724/724664.png" alt="Phone Icon" />
        <img src="https://cdn-icons-png.flaticon.com/512/1239/1239525.png" alt="Location Icon" />
      </div>
    </div>
  );
}

export default ContactUs;
