import React from 'react';
import { useLocation } from 'react-router-dom';
import placeholder from '../../icons/placeholder.svg';
import '../styles/propertyCard-Styles.css';

const PropertyCard = () => {
    const location = useLocation();
    const Product_Info = location.state || {};

    return (
        <div className="property-card">
            <section className="image-section">
                <img
                    src={Product_Info.PreviewPicture || placeholder}
                    width={1200}
                    height={600}
                    alt="Property"
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
                        {[
                            { label: 'Bedrooms', value: Product_Info.bedroomCount },
                            { label: 'Bathrooms', value: Product_Info.bathroomCount },
                            { label: 'Property Type', value: Product_Info.propertyType },
                            { label: 'Size', value: `${Product_Info.sizeNumber} ${Product_Info.sizeUnit}` },
                        ].map((spec, index) => (
                            <div className="spec" key={index}>
                                <span className="spec-label">{spec.label}</span>
                                <span className="spec-value">{spec.value}</span>
                            </div>
                        ))}
                    </div>
                    <div className="condition">
                        <span className="condition-label">Condition</span>
                        <div className="condition-value">
                            <CircleCheckIcon />
                            <span className="condition-text">{Product_Info.condition}</span>
                        </div>
                    </div>
                    <div className="description">
                        <p>{Product_Info.description}</p>
                    </div>
                </div>
                {
                <ScheduleForm />
                }
            </section>
        </div>
    );
};

const ScheduleForm = () => {
    return (
        <div className="schedule-card">
            <h2 className="schedule-title">Schedule a Showing</h2>
            <p className="schedule-description">Fill out the form to schedule a tour of this property.</p>
            <form className="schedule-form">
                {['Name', 'Email', 'Phone', 'Preferred Date'].map((field, index) => (
                    <div className="form-group" key={index}>
                        <label htmlFor={field.toLowerCase()}>{field}</label>
                        <input
                            id={field.toLowerCase()}
                            type={field === 'Email' ? 'email' : field === 'Phone' ? 'tel' : field === 'Preferred Date' ? 'date' : 'text'}
                            placeholder={field === 'Name' ? 'John Doe' : field === 'Email' ? 'john@example.com' : field === 'Phone' ? '(123) 456-7890' : ''}
                        />
                    </div>
                ))}
                <button type="submit" className="schedule-button">Schedule Showing</button>
            </form>
        </div>
    );
};

const CircleCheckIcon = () => (
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

export default PropertyCard;
