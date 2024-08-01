import React, { useState, useEffect } from 'react';
import '../styles/sell_rentUpload-Styles.css';
import MiniListing from './miniListings';

export default function SellRent_Upload({ Upload_Type }) {
    const [ListingImage, setListingImage] = useState();
    const [ListingImageURL, setListingImageURL] = useState('');
    const [selectedButton, setSelectedButton] = useState('');
    const [showPreviewSection, setshowPreviewSection] = useState(window.innerWidth > 600);
    
    const [formValues, setFormValues] = useState({
        Property_Type: '',
        Area: '',
        City: '',
        Size: '',
        Price: '',
        No_of_bedrooms: '',
        No_of_bathrooms: '',
        description: '',
        Condition: ''
    });

    useEffect(() => {
        const handleResize = () => {
            setshowPreviewSection(window.innerWidth > 600);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleInputChange = (name, value) => {
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setListingImage(file);
            setListingImageURL(URL.createObjectURL(file));
        } else {
            alert('Please select a valid image file.');
        }
    };

    const handleButtonClick = (name, value) => {
        const newValue = selectedButton === value ? '' : value;
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: newValue,
        }));
        setSelectedButton(newValue);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(formValues).forEach(([key, val]) => {
            formData.append(key, val);
        });
        formData.append('Action_Type', Upload_Type);
        if (ListingImage) {
            formData.append('ListingImage', ListingImage);
        }
        formData.append('UserID', localStorage.getItem('UserId'));

        try {
            const response = await fetch('/Add_listings', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.ListingAdded) {
                alert('Listing has been successfully saved to the database.');
            } else {
                alert('Listing creation failed.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while saving the listing.');
        }
    };

    const isFormValid = Object.values(formValues).every(value => value.trim() !== '');

    return (
        <div className="Upload_div" style={{ justifyContent: showPreviewSection ? 'space-around' : '' }}>
            <form onSubmit={handleSubmit}>
                <div className="upload_labels">Property Type?</div>
                <div className="select_options">
                    {['Residential', 'Commercial', 'Plot'].map(type => (
                        <button
                            key={type}
                            type="button"
                            style={{
                                backgroundColor: selectedButton === type ? '#575757' : '',
                                color: selectedButton === type ? 'white' : '',
                                fontWeight: selectedButton === type ? 'bold' : '',
                                width: !showPreviewSection ? '30vmax' : ''
                            }}
                            onClick={() => handleButtonClick('Property_Type', type)}
                        >
                            {type}
                        </button>
                    ))}
                </div>
                <div>
                    <div className="upload_labels">Property Image</div>
                    <div className="select_options">
                        <input
                            type="file"
                            accept='image/*'
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
                {/* Render input fields */}
                {['Area', 'City', 'Size', 'Price', 'No of Bedrooms', 'No of Bathrooms', 'Description', 'Condition'].map((field, index) => (
                    <Inputdivs
                        key={index}
                        labelText={`Enter ${field.replace(/_/g, ' ')}`}
                        inputPlaceholder={`Enter ${field}`}
                        inputType={field === 'description' ? 'textarea' : 'text'}
                        onChange={value => handleInputChange(field, value)}
                    />
                ))}
                <button className='uploadSubmitbtn' type="submit" disabled={!isFormValid}>Sell Now</button>
            </form>
            {showPreviewSection &&
                <div className="preview_section">
                    <div className="upload_labels">Preview</div>
                    <MiniListing
                        currency="AED"
                        amount={formValues.Price || "0"}
                        bedroomCount={formValues.No_of_bedrooms}
                        bathroomCount={formValues.No_of_bathrooms}
                        propertyType={formValues.Property_Type || "None"}
                        sizeNumber={formValues.Size || "Size"}
                        sizeUnit="sq ft"
                        shortDescriptionText={`${formValues.Property_Type || "Type"} for ${Upload_Type} in ${formValues.Area || "Area"}, ${formValues.City || "City"}`}
                        description={formValues.description || "Description Here"}
                        condition={formValues.Condition}
                        PreviewPicture={ListingImageURL}
                    />
                </div>
            }
        </div>
    );
}

function Inputdivs({ labelText, inputPlaceholder, inputType, min, onChange }) {
    const handleChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <div>
            <div className="upload_labels">{labelText}</div>
            <div className="select_options">
                <input
                    type={inputType}
                    placeholder={inputPlaceholder}
                    min={inputType === 'number' ? min : undefined}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}
