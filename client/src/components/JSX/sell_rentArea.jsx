import React from 'react';
import '../styles/sell_rentArea-Styles.css';
import SellRentUpload from './sell_rentUpload';

export default function SellRentArea({ Upload_Type }) {

    return (
        <>
            <div className="PropertyUpload">
                <div className="UploadMain">
                    {(Upload_Type === "sale") ? (
                        <h1>Ready To Sell ?</h1>
                    ) : (
                        <h1>Ready To Rent ?</h1>
                    )
                    }
                    <h4>Tell Us About Your Property</h4>
                </div>
                <SellRentUpload Upload_Type = {Upload_Type}/>
            </div>
        </>
    );
}
