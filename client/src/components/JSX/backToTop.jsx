import React, { useState, useEffect } from 'react';
import '../styles/backToTop-Styles.css'

export default function Backtotop() {
    const [showbacktotop, setbacktotop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setbacktotop(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrolltotop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <>
            {showbacktotop &&
                <div className='backtotop' onClick={scrolltotop}></div>
            }
        </>
    )
}
