import React from 'react';
import '../styles/mainImageScroller-Styles.css';

export default function MainImageScroller({ imageName, displayText }) {
    return (
        <main>
            <div 
                className="backdrop-images" 
                style={{ backgroundImage: `url(${require(`../../images/backdropimages/${imageName}`)})` }}
            >
                <p>{displayText}</p>
            </div>
        </main>
    );
}
