import React, { useState, useEffect } from 'react';
import '../styles/header-Styles.css';
import SignIn from './signInForm';
import { useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, UserName, UserID, onLogin, onLogout }) => {
    const [showSignInDiv, setShowSignInDiv] = useState(false);
    const [bodyScroll, setBodyScroll] = useState(true);
    const [showMenu, setShowMenu] = useState(false);
    const [showMenuBtn, setShowMenuBtn] = useState(false);
    const [menuPosition, setMenuPosition] = useState(-100);
    const [showMainOptions, setShowMainOptions] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflow = bodyScroll ? 'auto' : 'hidden';
    }, [bodyScroll]);

    useEffect(() => {
        const handleResize = () => {
            setShowMenuBtn(window.innerWidth <= 600);
            setShowMenu(window.innerWidth <= 600);
            setShowMainOptions(window.innerWidth > 600);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleMenu = () => {
        setMenuPosition(prevPosition => (prevPosition === 0 ? -100 : 0));
        setShowMenuBtn(prevShowMenuBtn => !prevShowMenuBtn);
        setIsMenuOpen(!isMenuOpen);
        setBodyScroll(!bodyScroll);
    };

    const toggleSignInDiv = () => {
        setShowSignInDiv(!showSignInDiv);
        setBodyScroll(!bodyScroll);
    };

    const handleLogin = (UserName, UserID) => {
        onLogin(UserName, UserID);
        setShowSignInDiv(false);
    };

    const changeSearchTerm = (event) => {
        setSearchTerm(event.target.value);
        localStorage.setItem('searchQuery', event.target.value);
    };

    const fetchListings = async () => {
        try {
            const response = await fetch('https://halandmarks-repo.onrender.com/api/listings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ searchQuery: searchTerm })
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            setSearchResults(data); 
    
            navigate('/Buy', { state: { searchResults: data } }); 
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const onSearchEnter = (event) => {
        event.preventDefault();
        fetchListings();
    };
    

    return (
        <>
            {showMenu && (
                <div className="menu" style={{ left: `${menuPosition}%` }}>
                    <button className="cross" id="menucross" onClick={toggleMenu}></button>
                    <a href="/" className="SideLogo" style={{ fontFamily: 'Times New Roman' }}>
                        <div>UAE LANDMARKS</div>
                    </a>
                    <form className="searcharea_side">
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={changeSearchTerm}
                        />
                        <button onClick={onSearchEnter}></button>
                    </form>
                    <div className="sideoptions">
                        <a href="/Sell">Sell</a>
                        <a href="/Rent">Rent</a>
                        <a href="/Buy">Search</a>
                    </div>
                </div>
            )}
            <header className={isMenuOpen ? 'blurred' : ''}>
                {showMenuBtn && <button className="menubutton" onClick={toggleMenu}></button>}
                <a href="/" className="Logo" style={{ fontFamily: 'Times New Roman' }}>
                    <div>UAE LANDMARKS</div>
                </a>
                {showMainOptions && (
                    <div className="mainoptions">
                        <a href="/Sell">Sell</a>
                        <a href="/Rent">Rent</a>
                        <a href="/Buy">Search</a>
                    </div>
                )}

                <div className="userenterarea">
                    {isLoggedIn ? (
                        <>
                            <button onClick={onLogout}>Logout</button>
                            <span>{UserName}</span>
                        </>
                    ) : (
                        <>
                            <button onClick={toggleSignInDiv}>Log In</button>
                            <a href="/SignUp">Sign Up</a>
                        </>
                    )}
                </div>
                {!showMenu &&
                    <form className="searcharea">
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={changeSearchTerm}
                        />
                        <button onClick={onSearchEnter}></button>
                    </form>
                }
            </header>
            {showSignInDiv && <SignIn onClose={toggleSignInDiv} onLogin={handleLogin} />}
        </>
    );
};

export default Header;