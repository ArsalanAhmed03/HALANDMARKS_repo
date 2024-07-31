import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/miniListings-Styles.css'
import placeholder from '../../icons/placeholder.svg'

const MiniListing = ({
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
    useEffect(() => {
        const handleResize = () => {
            setShowProductDescription(window.innerWidth > 600);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const moveToProductListing = () => {
        const Product_Info = {
            currency: currency,
            amount: amount,
            propertyType: propertyType,
            sizeNumber: sizeNumber,
            sizeUnit: sizeUnit,
            shortDescriptionText: shortDescriptionText,
            description: description,
            condition: condition,
            PreviewPicture: PreviewPicture,
            bedroomCount: bedroomCount,
            bathroomCount: bathroomCount,
            ActionType: ActionType
        }
        navigate('/Listing', { state: Product_Info });
    }
    return (
        <>
            <div className="card" onClick={moveToProductListing}>
                <div className="image-content">
                    <img
                        src={PreviewPicture === '' ? (placeholder) : PreviewPicture}
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
                    {showProductDescription &&
                        <h3 className="property-title">{shortDescriptionText}</h3>
                    }
                    {showProductDescription &&
                        <p className="property-description">
                            {description}
                        </p>
                    }
                    <div className="card-footer">
                        <div className="property-condition">{condition} Condition</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MiniListing;
