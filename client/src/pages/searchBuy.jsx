import React from 'react';
import SearchArea from '../components/JSX/searchArea';
import { useLocation } from 'react-router-dom';

const Search = (() => {
    const location = useLocation();
    const searchResults = location.state?.searchResults || [];
    return (
        <>
            <SearchArea searchResults={searchResults}/>
        </>
    )
});

export default Search;
