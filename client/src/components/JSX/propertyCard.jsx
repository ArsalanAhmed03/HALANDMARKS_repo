import React from 'react';
import { useLocation } from 'react-router-dom';
import placeholder from '../../icons/placeholder.svg'
import '../styles/propertyCard-Styles.css'

export default function PropertyCard() {
    const location = useLocation();
    const Product_Info = location.state || {};
    return (
        <div className="property-card">
            <section className="image-section">
                <img
                    src={Product_Info.PreviewPicture === '' ? placeholder : Product_Info.PreviewPicture}
                    width={1200}
                    height={600}
                    alt="Property Image"
                    className="property-image"
                />
            </section>
            <section className="details-section">
                <div className="details">
                    <h1 className="property-title">{Product_Info.shortDescriptionText}</h1>
                    <div className="price-status">
                        <span className="property-price">{Product_Info.amount} AED</span>
                        <span className="badge">For {Product_Info.ActionType}</span>
                    </div>
                    <div className="property-specs">
                        <div className="spec">
                            <span className="spec-label">Bedrooms</span>
                            <span className="spec-value">{Product_Info.bedroomCount}</span>
                        </div>
                        <div className="spec">
                            <span className="spec-label">Bathrooms</span>
                            <span className="spec-value">{Product_Info.bathroomCount}</span>
                        </div>
                        <div className="spec">
                            <span className="spec-label">Property Type</span>
                            <span className="spec-value">{Product_Info.propertyType}</span>
                        </div>
                        <div className="spec">
                            <span className="spec-label">Size</span>
                            <span className="spec-value">{Product_Info.sizeNumber} {Product_Info.sizeUnit}</span>
                        </div>
                    </div>
                    <div className="condition">
                        <span className="condition-label">Condition</span>
                        <div className="condition-value">
                            <CircleCheckIcon />
                            <span className="condition-text">{Product_Info.condition}</span>
                        </div>
                    </div>
                    <div className="description">
                        <p>
                        {Product_Info.description}
                        </p>
                    </div>
                </div>
                <div className="schedule-card">
                    <h2 className="schedule-title">Schedule a Showing</h2>
                    <p className="schedule-description">Fill out the form to schedule a tour of this property.</p>
                    <form className="schedule-form">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text" placeholder="John Doe" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" placeholder="john@example.com" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input id="phone" type="tel" placeholder="(123) 456-7890" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">Preferred Date</label>
                            <input id="date" type="date" />
                        </div>
                        <button type="submit" className="schedule-button">Schedule Showing</button>
                    </form>
                </div>
            </section>
        </div>
    );
}

function CircleCheckIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="check-icon"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}