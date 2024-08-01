import React, { useEffect, useState } from 'react';
import Filter from './filter';
import SearchResults from './searchResults';
import '../styles/searchArea-Styles.css';

export default function SearchArea() {
    const [showFilter, setShowFilter] = useState(window.innerWidth > 600);

    useEffect(() => {
        const handleResize = () => {
            setShowFilter(window.innerWidth > 600);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleFilter = () => {
        setShowFilter((prevShowFilter) => !prevShowFilter);
    };

    return (
        <div className="allSearchArea">
            {!showFilter ? (
                <button 
                    className="filterbutton" 
                    onClick={toggleFilter} 
                    aria-expanded={showFilter}
                    aria-controls="filter"
                >
                    Filter
                </button>
            ) : (
                <Filter toggleFilter={toggleFilter} />
            )}
            <SearchResults />
        </div>
    );
}
