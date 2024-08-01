import React, { useState, useEffect, useCallback } from 'react';
import '../styles/filter-Styles.css';

const SelectField = React.memo(({ id, value, onChange, options }) => (
    <div className="input-group">
        <select id={id} value={value} onChange={onChange}>
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </div>
));

export default function Filter({ toggleFilter }) {
    const [priceRangeValue, setPriceRangeValue] = useState(50);
    const [bedroomFilter, setBedroomFilter] = useState("Any");
    const [bathroomsFilter, setBathroomsFilter] = useState("Any");
    const [showCross, setShowCross] = useState(window.innerWidth < 600);

    const handleResize = useCallback(() => {
        setShowCross(window.innerWidth < 600);
    }, []);

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    return (
        <div className="filterArea">
            {showCross && (
                <button className="cross" id="menucross" onClick={toggleFilter}></button>
            )}
            <h3>Filter</h3>
            <label htmlFor="priceRange">Price Range: ${priceRangeValue}</label>
            <div className="slider-container">
                <input
                    type="range"
                    id="priceRange"
                    name="priceRange"
                    min="0"
                    max="100"
                    value={priceRangeValue}
                    onChange={(e) => setPriceRangeValue(e.target.value)}
                />
            </div>
            <label htmlFor="Bedroom">Bedrooms</label>
            <SelectField
                id="Bedroom"
                value={bedroomFilter}
                onChange={(e) => setBedroomFilter(e.target.value)}
                options={['Any', '1+', '2+', '3+', '4+', '5+', '6+']}
            />
            <label htmlFor="Bathrooms">Bathrooms</label>
            <SelectField
                id="Bathrooms"
                value={bathroomsFilter}
                onChange={(e) => setBathroomsFilter(e.target.value)}
                options={['Any', '1+', '2+', '3+', '4+', '5+', '6+']}
            />

            <label htmlFor="filter-checkbox-container">Property Type</label>
            <div className="filter-checkbox-container">
                {['House', 'Apartment', 'Condo'].map((label, index) => (
                    <label key={index} className="custom-checkbox">
                        <input type="checkbox" name="option" value={index + 1} />
                        <span className="checkmark"></span>
                        {label}
                    </label>
                ))}
            </div>
        </div>
    );
}
