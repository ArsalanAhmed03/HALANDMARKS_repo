import React, { useState, useEffect } from 'react';
import '../styles/filter-Styles.css';

export default function Filter({toggleFilter}) {
    const [priceRangeValue, setPriceRangeValue] = useState(50);
    const [bedroomFilter, setBedroomFilter] = useState("Any");
    const [bathroomsFilter, setBathroomsFilter] = useState("Any");
    const [showCross, setShowCross] = useState(window.innerWidth < 600);

    useEffect(() => {
        const handleResize = () => {
            setShowCross(window.innerWidth < 600);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="filterArea">
            {showCross && 
            <button className="cross" id="menucross" onClick={toggleFilter}></button>
}
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
            <div class="filter-checkbox-container">
                <label class="custom-checkbox">
                    <input type="checkbox" name="option" value="1" />
                    <span class="checkmark"></span>
                    House
                </label>
                <label class="custom-checkbox">
                    <input type="checkbox" name="option" value="2" />
                    <span class="checkmark"></span>
                    Apartment
                </label>
                <label class="custom-checkbox">
                    <input type="checkbox" name="option" value="3" />
                    <span class="checkmark"></span>
                    Condo
                </label>
            </div>

        </div>
    );
}

const SelectField = ({ label, name, value, onChange, options, required }) => (
    <div className="input-group">
        <select id={name} name={name} value={value} onChange={onChange} required={required}>
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </div>
);
