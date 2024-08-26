import React, { useEffect, useState, lazy, Suspense, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home-main-Styles.css';
// import MiniListing from './miniListings';
const MiniListing = lazy(() => import('./miniListings'));
const MainImageScroller = lazy(() => import("./mainImageScroller"));

export default function HomeMain() {
    const [searchResults, setSearchResults] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsToShow, setItemsToShow] = useState(window.innerWidth > 600 ? (window.innerWidth > 800 ? (window.innerWidth > 1500 ? 4 : 3) : 2) : 1);
    const [showServiceDescription, setShowServiceDescription] = useState(window.innerWidth > 600);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await fetch('https://halandmarks-repo.onrender.com/api/listings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ searchQuery: '' })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setSearchResults(data);
            } catch (err) {
                console.error('Fetch error:', err);
            }
        };

        fetchListings();

        return () => {
            localStorage.removeItem('searchQuery');
        };
    }, []);

    const handleResize = useCallback(() => {
        setShowServiceDescription(window.innerWidth > 600);
        setItemsToShow((window.innerWidth > 600 ? (window.innerWidth > 800 ? (window.innerWidth > 1500 ? 4 : 3) : 2) : 1));
    }, []);

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    const handlePrevClick = useCallback(() => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }, []);

    const handleNextClick = useCallback(() => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, searchResults.length - itemsToShow));
    }, [searchResults.length, itemsToShow]);

    return (
        <div className="container">
            <main className="main">
                <Suspense fallback={<p>Loading...</p>}>
                    <section className="hero-section">
                        <div className="container-inner">
                            <div className="hero-content">
                                <div className="hero-text">
                                    <h1 className="hero-title">
                                        Find Your Dream Home with UAE LandMarks
                                    </h1>
                                    <p className="hero-description">
                                        Discover a wide range of properties for sale or rent in the most desirable neighborhoods.
                                    </p>
                                </div>
                                <div className="hero-buttons">
                                    <Link to="/Buy" className="primary-button">
                                        Search
                                    </Link>
                                    <Link to="/ContactUs" className="secondary-button">
                                        Contact
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </Suspense>
                <section className="services-section">
                    <div className="container-inner">
                        <div className="services-content">
                            <h2 className="section-title">Our Services</h2>
                            <p className="section-description">
                                UAE LandMarks offers a wide range of services to help you with all your real estate needs.
                            </p>
                        </div>
                    </div>
                    <div className="services">
                        <Link to="/Buy" className="service1">
                            <div className="serviceIcon"></div>
                            <div className="serviceText">Buy</div>
                            {showServiceDescription &&
                                <div className="serviceDescription">
                                    Our experienced agents will guide you through the home-buying process, from finding the perfect property to securing the best deal.
                                </div>
                            }
                        </Link>
                        <Link to="/Sell" className="service2">
                            <div className="serviceIcon"></div>
                            <div className="serviceText">Sell</div>
                            {showServiceDescription &&
                                <div className="serviceDescription">
                                    We'll help you prepare your home for the market, market it effectively, and negotiate the best price for your property.
                                </div>
                            }
                        </Link>
                        <Link to="/Rent" className="service3">
                            <div className="serviceIcon"></div>
                            <div className="serviceText">Rent</div>
                            {showServiceDescription &&
                                <div className="serviceDescription">
                                    Whether you're looking to rent a home, apartment, or commercial space, our team will help you find the perfect property.
                                </div>
                            }
                        </Link>
                    </div>
                </section>
                <Suspense fallback={<p>Loading...</p>}>
                    <MainImageScroller
                        imageName="backdrop-6.jpg" // Use next-gen format
                        displayText="Discover Your Perfect Property"
                    />
                </Suspense>
                <section className="featured-section">
                    <div className="container-inner">
                        <div className="featured-content">
                            <h2 className="section-title">Featured Properties</h2>
                            <p className="section-description">
                                Explore our selection of the best properties on the market.
                            </p>
                        </div>
                    </div>
                    <div className="featured-properties-wrapper">
                        <button className="arrow left-arrow" onClick={handlePrevClick} disabled={currentIndex === 0}></button>
                        <div className="featured-properties">
                            {searchResults.slice(currentIndex, currentIndex + itemsToShow).map((result, index) => (
                                <Suspense fallback={<p>Loading...</p>}>
                                    <MiniListing
                                        key={index}
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
                                        width={300} // Set width for layout stability
                                        height={200} // Set height for layout stability
                                    />
                                </Suspense>
                            ))}
                        </div>
                        <button className="arrow right-arrow" onClick={handleNextClick} disabled={currentIndex >= searchResults.length - itemsToShow}></button>
                    </div>
                </section>
            </main>
        </div>
    );
}
