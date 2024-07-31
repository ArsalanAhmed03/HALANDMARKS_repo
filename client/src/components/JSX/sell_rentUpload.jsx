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
        setListingImage(e.target.files[0]);
        setListingImageURL(URL.createObjectURL(e.target.files[0]));
    }

    const handleButtonClick = (name, value) => {
        if (selectedButton === value) {
            setFormValues(prevValues => ({
                ...prevValues,
                [name]: '',
            }));
        }
        else {
            setFormValues(prevValues => ({
                ...prevValues,
                [name]: value,
            }));
        }
        setSelectedButton(prevValue => (prevValue === value ? '' : value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('Property_Type', formValues.Property_Type);
        formData.append('Area', formValues.Area);
        formData.append('City', formValues.City);
        formData.append('Size', formValues.Size);
        formData.append('Price', formValues.Price);
        formData.append('No_of_bedrooms', formValues.No_of_bedrooms);
        formData.append('No_of_bathrooms', formValues.No_of_bathrooms);
        formData.append('description', formValues.description);
        formData.append('Condition', formValues.Condition);
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
        <>
            <div className="Upload_div" style={{ justifyContent: showPreviewSection ? 'space-around' : '' }}>
                <form onSubmit={handleSubmit}>
                    <div className="upload_labels">Property Type?</div>
                    <div className="select_options">
                        <button
                            type="button"
                            style={{
                                backgroundColor: selectedButton === 'Residential' ? '#575757' : '',
                                color: selectedButton === 'Residential' ? 'white' : '',
                                fontWeight: selectedButton === 'Residential' ? 'bold' : '',
                                width: !showPreviewSection ? '30vmax' : ''
                            }}
                            onClick={() => handleButtonClick('Property_Type', 'Residential')}
                        >
                            Residential
                        </button>
                        <button
                            type="button"
                            style={{
                                backgroundColor: selectedButton === 'Commercial' ? '#575757' : '',
                                color: selectedButton === 'Commercial' ? 'white' : '',
                                fontWeight: selectedButton === 'Commercial' ? 'bold' : '',
                                width: !showPreviewSection ? '30vmax' : ''
                            }}
                            onClick={() => handleButtonClick('Property_Type', 'Commercial')}
                        >
                            Commercial
                        </button>
                        <button
                            type="button"
                            style={{
                                backgroundColor: selectedButton === 'Plot' ? '#575757' : '',
                                color: selectedButton === 'Plot' ? 'white' : '',
                                fontWeight: selectedButton === 'Plot' ? 'bold' : '',
                                width: !showPreviewSection ? '30vmax' : ''
                            }}
                            onClick={() => handleButtonClick('Property_Type', 'Plot')}
                        >
                            Plot
                        </button>
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
                    <Inputdivs
                        labelText="In which area is the Property located?"
                        inputPlaceholder="Select Your Area"
                        inputType="text"
                        onChange={value => handleInputChange('Area', value)}
                    />
                    <Inputdivs
                        labelText="In which city is the Property located?"
                        inputPlaceholder="Select Your City"
                        inputType="text"
                        onChange={value => handleInputChange('City', value)}
                    />
                    <Inputdivs
                        labelText="What is the size of the Property(sq.ft)?"
                        inputPlaceholder="0"
                        inputType="number"
                        min={0}
                        onChange={value => handleInputChange('Size', value)}
                    />
                    <br />
                    <Inputdivs
                        labelText="What is the asking Price?"
                        inputPlaceholder="0"
                        inputType="number"
                        min={0}
                        onChange={value => handleInputChange('Price', value)}
                    />
                    <Inputdivs
                        labelText="Number of bedrooms?"
                        inputPlaceholder="1"
                        inputType="number"
                        min={1}
                        onChange={value => handleInputChange('No_of_bedrooms', value)}
                    />
                    <Inputdivs
                        labelText="Number of bathrooms?"
                        inputPlaceholder="1"
                        inputType="number"
                        min={1}
                        onChange={value => handleInputChange('No_of_bathrooms', value)}
                    />
                    <Inputdivs
                        labelText="Tell us more about your property"
                        inputPlaceholder=" "
                        inputType="textarea"
                        onChange={value => handleInputChange('description', value)}
                    />
                    <Inputdivs
                        labelText="Describe your properties condition"
                        inputPlaceholder=" "
                        inputType="text"
                        onChange={value => handleInputChange('Condition', value)}
                    />
                    <button className='uploadSubmitbtn' type="submit" disabled={!isFormValid}>Sell Now</button>
                </form>
                {showPreviewSection &&
                    <div className="preview_section">
                        <div className="upload_labels">Preview</div>
                        <MiniListing
                            currency="AED"
                            amount={
                                (formValues.Price === '') ? ("0") : (formValues.Price)
                            }
                            bedroomCount={formValues.No_of_bedrooms}
                            bathroomCount={formValues.No_of_bathrooms}
                            propertyType={
                                (formValues.Property_Type === '') ? ("None") : (formValues.Property_Type)
                            }
                            sizeNumber={formValues.Size === '' ? ("Size") : formValues.Size}
                            sizeUnit="sq ft"
                            shortDescriptionText={`${formValues.Property_Type === '' ? ("Type") : formValues.Property_Type} for ${Upload_Type} in ${formValues.Area === '' ? ("Area") : formValues.Area}, ${formValues.City === '' ? ("City") : formValues.City}`}
                            description={formValues.description === '' ? ("Description Here") : formValues.description}
                            condition={formValues.Condition}
                            PreviewPicture={ListingImageURL}
                        />
                    </div>
                }
            </div>
        </>
    );
}


function Inputdivs({ name, labelText, inputPlaceholder, inputType, min, onChange }) {
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
};