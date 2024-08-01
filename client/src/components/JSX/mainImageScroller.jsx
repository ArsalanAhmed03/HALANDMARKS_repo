import React from 'react';
import PropTypes from 'prop-types';
import '../styles/mainImageScroller-Styles.css';

const MainImageScroller = React.memo(({ imageName, displayText }) => {
    const imagePath = require(`../../images/backdropimages/${imageName}`);

    return (
        <main>
            <div 
                className="backdrop-images" 
                style={{ backgroundImage: `url(${imagePath})` }}
            >
                <p>{displayText}</p>
            </div>
        </main>
    );
});

MainImageScroller.propTypes = {
    imageName: PropTypes.string.isRequired,
    displayText: PropTypes.string.isRequired,
};

export default MainImageScroller;
