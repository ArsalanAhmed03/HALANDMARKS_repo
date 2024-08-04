import React, { useEffect, useState, useRef } from 'react';
import '../styles/searchResults-Styles.css';
import MiniListing from './miniListings';

export default function SearchResults() {
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
    );
}
