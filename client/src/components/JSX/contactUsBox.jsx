import React from "react";
import '../styles/contactUsBox-Styles.css';

export default function ContactUs() {
    return (
        <div>
            <section className="contact-section">
                <div className="container">
                    <div className="grid">
                        <div>
                            <h1 className="heading">Get in Touch</h1>
                            <p className="description">
                                Have a question or want to work with us? Fill out the form and we'll get back to you as soon as
                                possible.
                            </p>
                        </div>
                        <div>
                            <form className="form">
                                <div>
                                    <label htmlFor="name" className="label">
                                        Name
                                    </label>
                                    <input id="name" type="text" placeholder="John Doe" className="input" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="label">
                                        Email
                                    </label>
                                    <input id="email" type="email" placeholder="john@example.com" className="input" />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="label">
                                        Phone
                                    </label>
                                    <input id="phone" type="tel" placeholder="(123) 456-7890" className="input" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="label">
                                        Message
                                    </label>
                                    <textarea id="message" rows={4} placeholder="Your message" className="textarea"></textarea>
                                </div>
                                <button type="submit" className="button">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <section className="location-section">
                <div className="container">
                    <div className="grid">
                        <div>
                            <h2 className="subheading">Our Location</h2>
                            <div className="contact-info">
                                <div>
                                    <h3 className="info-title">Address</h3>
                                    <p className="info-description">123 Main St, Anytown USA 12345</p>
                                </div>
                                <div>
                                    <h3 className="info-title">Phone</h3>
                                    <p className="info-description">(123) 456-7890</p>
                                </div>
                                <div>
                                    <h3 className="info-title">Email</h3>
                                    <p className="info-description">info@realestate.com</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <img src="/placeholder.svg" alt="Office Location" className="image" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
