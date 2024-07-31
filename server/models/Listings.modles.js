const mongoose = require('mongoose');

const ListingsSchema = new mongoose.Schema(
    {
        User_ID:{
            type: String,
            required:[true,'UserID is required']
        },
        Listing_Image_Name:{
            type:String,
            required:[true,'Image is required']
        },
        Property_Type: {
            type: String,
            required: [true, 'Property type is required']
        },
        Action_Type: {
            type: String,
            required: [true, 'Action type is required']
        },
        Area: {
            type: String,
            required: [true, 'Area is required']
        },
        City: {
            type: String,
            required: [true, 'City is required']
        },
        Size: {
            type: Number,
            required: [true, 'Size is required']
        },
        Price: {
            type: Number,
            required: [true, 'Price is required']
        },
        No_of_bedrooms: {
            type: Number,
            required: [true, 'Number of bedrooms is required']
        },
        No_of_bathrooms: {
            type: Number,
            required: [true, 'Number of bathrooms is required']
        },
        description: {
            type: String,
            required: [true, 'Description is required']
        },
        Condition: {
            type: String,
            required: [true, 'Condition is required']
        }
    },
    { timestamps: true }
);

const Listings = mongoose.model('Listing', ListingsSchema);
module.exports = Listings;
