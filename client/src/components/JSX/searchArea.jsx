import React from 'react';
import FilterComponent from './filterArea';
import SearchResults from './searchResults';
import '../styles/searchArea-Styles.css';

export default function SearchArea() {
    return (
        <>
            <FilterComponent />
            <SearchResults />
        </>
    );
}
