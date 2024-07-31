import React, { useEffect, useState } from 'react';
import Filter from './filter';
import SearchResults from './searchResults';
import '../styles/searchArea-Styles.css'

export default function SearchArea() {
    const [showFilter, setShowFilter] = useState(window.innerWidth > 600);

    useEffect(() => {
        const handleResize = () => {
            setShowFilter(window.innerWidth > 600);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleFilter = () =>{
        setShowFilter(!showFilter);
    }

    return (
        <>
            <div className="allSearchArea" >
                {!showFilter && <button className="filterbutton" onClick={toggleFilter}>Filter</button>}
                {showFilter && <Filter toggleFilter={toggleFilter}/>}
                <SearchResults />
            </div>
        </>
    );
};
