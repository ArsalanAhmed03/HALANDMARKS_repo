import React, { useEffect, useState, useRef } from 'react';
import '../styles/searchArea-Styles.css';
import MiniListing from './miniListings';

export default function SearchArea() {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const searchQueryRef = useRef(localStorage.getItem('searchQuery') || '');

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await fetch('/api/listings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ searchQuery: searchQueryRef.current })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setSearchResults(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchListings();

        return () => {
            // Remove the search query only when the component unmounts
            // or on specific user actions if needed.
            // localStorage.removeItem('searchQuery'); 
        };
    }, [searchQueryRef.current]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <Filter />
            <div className="search_results_area">
                {searchResults.length > 0 ? (
                    searchResults.map((result) => (
                        <MiniListing
                            key={result.Listing_ID}
                            currency="AED"
                            amount={result.Price}
                            bedroomCount={result.No_of_bedrooms}
                            bathroomCount={result.No_of_bathrooms}
                            propertyType={result.Property_Type}
                            sizeNumber={result.Size}
                            sizeUnit="sq ft"
                            shortDescriptionText={`${result.Property_Type} Property for ${result.Action_Type} in ${result.Area}, ${result.City}`}
                            description={result.description}
                            condition={result.Condition}
                            PreviewPicture={`/uploads/${result.Listing_Image_Name}`}
                            ActionType={result.Action_Type}
                        />
                    ))
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </>
    );
}

function Filter() {
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