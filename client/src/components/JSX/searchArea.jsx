import React, { useEffect, useState } from 'react';
import '../styles/searchArea-Styles.css';
import MiniListing from './miniListings';

export default function SearchArea({ searchResults }) {
    const [originalResults, setOriginalResults] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        localStorage.removeItem('searchQuery');
        fetchListings();
    }, []);

    const fetchListings = async () => {
        setLoading(true); 
        try {
            const response = await fetch('https://halandmarks-backend.onrender.com/api/listings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ searchQuery: "" })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setOriginalResults(data);
        } catch (error) {
            console.error('Error fetching listings:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchResults.length > 0) {
            setOriginalResults(searchResults);
        }
    }, [searchResults]);

    const applyFilters = () => {
        let results = [...originalResults]; 

        const minPriceNum = minPrice ? parseFloat(minPrice) : undefined;
        const maxPriceNum = maxPrice ? parseFloat(maxPrice) : undefined;
        const bedroomsNum = bedrooms ? parseInt(bedrooms) : undefined;
        const bathroomsNum = bathrooms ? parseInt(bathrooms) : undefined;

        if (minPriceNum !== undefined) {
            results = results.filter(result => result.Price >= minPriceNum);
        }
        if (maxPriceNum !== undefined) {
            results = results.filter(result => result.Price <= maxPriceNum);
        }
        if (bedroomsNum !== undefined) {
            results = results.filter(result => result.No_of_bedrooms >= bedroomsNum);
        }
        if (bathroomsNum !== undefined) {
            results = results.filter(result => result.No_of_bathrooms >= bathroomsNum);
        }
        if (propertyType) {
            results = results.filter(result => result.Property_Type === propertyType);
        }

        return results;
    };

    const clearFilters = () => {
        setMinPrice('');
        setMaxPrice('');
        setBedrooms('');
        setBathrooms('');
        setPropertyType('');
    };

    const filteredResults = applyFilters();

    return (
        <>
            <Filter
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                bedrooms={bedrooms}
                setBedrooms={setBedrooms}
                bathrooms={bathrooms}
                setBathrooms={setBathrooms}
                propertyType={propertyType}
                setPropertyType={setPropertyType}
                clearFilters={clearFilters}
            />
            <div className="search_results_area">
                {loading ? ( 
                    <p>Loading...</p>
                ) : filteredResults.length > 0 ? (
                    filteredResults.map((result) => (
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

function Filter({ minPrice, setMinPrice, maxPrice, setMaxPrice, bedrooms, setBedrooms, bathrooms, setBathrooms, propertyType, setPropertyType, clearFilters }) {
    return (
        <div className="filter-area">
            <h2 className="filter-title">Filter Properties</h2>
            <div className="filter-grid">
                <div className="filter-section">
                    <h3 className="filter-subtitle">Price Range</h3>
                    <div className="price-inputs">
                        <input
                            type="number"
                            placeholder="Min Price"
                            className="price-input"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <span>-</span>
                        <input
                            type="number"
                            placeholder="Max Price"
                            className="price-input"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                </div>
                <div className="filter-section">
                    <h3 className="filter-subtitle">Bedrooms</h3>
                    <select className="filter-select" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
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
                    <select className="filter-select" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)}>
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
                    <select className="filter-select" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                        <option value="">Any</option>
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Plot">Plot</option>
                    </select>
                </div>
            </div>
            <div className="filter-buttons">
                <button className="filter-button" onClick={clearFilters}>Clear Filters</button>
            </div>
        </div>
    );
}
