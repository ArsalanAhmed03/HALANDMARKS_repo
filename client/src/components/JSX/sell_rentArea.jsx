import React from 'react';
import '../styles/sell_rentArea-Styles.css';
import SellRentUpload from './sell_rentUpload';

export default function SellRentArea({ Upload_Type }) {
    const title = Upload_Type === "sale" ? "Ready To Sell ?" : "Ready To Rent ?";

    return (
        <div className="PropertyUpload">
            <div className="UploadMain">
                <h1>{title}</h1>
                <h4>Tell Us About Your Property</h4>
            </div>
            <SellRentUpload Upload_Type={Upload_Type} />
        </div>
    );
}
