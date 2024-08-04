import React from 'react';
import '../styles/filterArea-Styles.css'

export default function FilterComponent() {
  return (
    <div className="filter-area">
      <h2 className="filter-title">Filter Properties</h2>
      <div className="filter-grid">
        <div className="filter-section">
          <h3 className="filter-subtitle">Price Range</h3>
          <div className="price-inputs">
            <input type="number" placeholder="Min Price" className="price-input" />
            <span>-</span>
            <input type="number" placeholder="Max Price" className="price-input" />
          </div>
        </div>
        <div className="filter-section">
          <h3 className="filter-subtitle">Bedrooms</h3>
          <select className="filter-select">
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>
        <div className="filter-section">
          <h3 className="filter-subtitle">Bathrooms</h3>
          <select className="filter-select">
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>
        <div className="filter-section">
          <h3 className="filter-subtitle">Property Type</h3>
          <select className="filter-select">
            <option value="">Any</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condominium</option>
            <option value="townhouse">Townhouse</option>
            <option value="land">Land</option>
          </select>
        </div>
      </div>
      <div className="filter-buttons">
        <button className="filter-button">Apply Filters</button>
        <button className="filter-button outline">Clear Filters</button>
      </div>
    </div>
  );
}
