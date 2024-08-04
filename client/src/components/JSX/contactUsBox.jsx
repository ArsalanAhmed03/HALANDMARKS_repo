import React from "react";
import '../styles/contactUsBox-Styles.css';

const ContactUs = () => {
  return (
    <div className="contact-container">
      <div className="contact-info">
        <h2 className="contact-header">Get in Touch</h2>
        <p className="contact-subheader">
          Have a question or want to work with us? Fill out the form or give us a call.
        </p>
        <div className="contact-details">
          <div className="detail-item">
            <MapPinIcon className="icon" />
            <div>
              <h3 className="detail-title">Office Address</h3>
              <p className="detail-description">123 Main St, Anytown USA 12345</p>
            </div>
          </div>
          <div className="detail-item">
            <PhoneIcon className="icon" />
            <div>
              <h3 className="detail-title">Phone</h3>
              <p className="detail-description">(123) 456-7890</p>
            </div>
          </div>
          <div className="detail-item">
            <MailIcon className="icon" />
            <div>
              <h3 className="detail-title">Email</h3>
              <p className="detail-description">info@realestate.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-form">
        <form className="form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input id="name" placeholder="Enter your name" className="input" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="Enter your email" className="input" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" rows={5} placeholder="Enter your message" className="textarea" />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input id="subject" placeholder="Enter the subject" className="input" />
          </div>
          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </div>
    </div>
  );
};

function MailIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function MapPinIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export default ContactUs;
