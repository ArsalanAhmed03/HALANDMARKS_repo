import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/miniListings-Styles.css';
import placeholder from '../../icons/placeholder.svg';

const MiniListing = React.memo(({
    currency,
    amount,
    bedroomCount,
    bathroomCount,
    propertyType,
    sizeNumber,
    sizeUnit,
    shortDescriptionText,
    description,
    condition,
    PreviewPicture,
    ActionType
}) => {
    const navigate = useNavigate();
    const [showProductDescription, setShowProductDescription] = useState(window.innerWidth > 600);

    const handleResize = useCallback(() => {
        setShowProductDescription(window.innerWidth > 600);
    }, []);

    useEffect(() => {
        handleResize(); // Initial check

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    const moveToProductListing = () => {
        const Product_Info = {
            currency,
            amount,
            propertyType,
            sizeNumber,
            sizeUnit,
            shortDescriptionText,
            description,
            condition,
            PreviewPicture,
            bedroomCount,
            bathroomCount,
            ActionType
        };
        navigate('/Listing', { state: Product_Info });
    };

    return (
        <div className="card" onClick={moveToProductListing}>
            <div className="image-content">
                <img
                    src={PreviewPicture || placeholder}
                    alt="Property"
                    className="property-image"
                />
            </div>
            <div className="card-content">
                <div className="card-header">
                    <div className="price">{amount} {currency}</div>
                    <div className="property-type">{propertyType}</div>
                </div>
                <div className="card-details">
                    <div className="property-size">{sizeNumber} {sizeUnit}</div>
                    <div className="property-info">{bedroomCount} Beds | {bathroomCount} Baths</div>
                </div>
                {showProductDescription && (
                    <>
                        <h3 className="property-title">{shortDescriptionText}</h3>
                        <p className="property-description">{description}</p>
                    </>
                )}
                <div className="card-footer">
                    <div className="property-condition">{condition} Condition</div>
                </div>
            </div>
        </div>
    );
});

MiniListing.propTypes = {
    currency: PropTypes.string.isRequired,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    bedroomCount: PropTypes.number.isRequired,
    bathroomCount: PropTypes.number.isRequired,
    propertyType: PropTypes.string.isRequired,
    sizeNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    sizeUnit: PropTypes.string.isRequired,
    shortDescriptionText: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    condition: PropTypes.string.isRequired,
    PreviewPicture: PropTypes.string,
    ActionType: PropTypes.string.isRequired
};

MiniListing.defaultProps = {
    PreviewPicture: '',
};

export default MiniListing;
