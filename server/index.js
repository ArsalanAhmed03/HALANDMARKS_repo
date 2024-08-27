const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const port = process.env.port || 80;
const app = express();

// CORS configuration
app.use(cors({
    origin: 'https://halandmarks-repo.vercel.app',  // Your frontend URL
    methods: ['GET', 'POST'],  // Methods you want to allow
}));

// Multer settings
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const upload = multer({ storage });

app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Your routes
const users = require("./models/user.model.js");
const Listings = require("./models/Listings.modles.js");

app.post('/validate-email', async (req, res) => {
    const email = req.body.email;
    const user = await users.findOne({ Email: email });
    if (user) {
        return res.status(400).json({ message: 'Email already in use' });
    } else {
        res.status(200).json({ message: 'Email available' });
    }
});

app.post('/signup', async (req, res) => {
    const { email, password, fullname, phone, emirate, city, address, pobox, nationality, dob, gender, language } = req.body;

    const user = new users({
        name: fullname,
        Email: email,
        Password: password,
        PhoneNumber: phone,
        Emirates: emirate,
        City: city,
        Address: address,
        POBox: pobox,
        Nationality: nationality,
        DOB: new Date(dob),
        Gender: gender,
        PreferredLanguage: language
    });

    try {
        await user.save();
        console.log('User has been successfully saved to the database.');
        res.status(200).json({ UserAdded: true });
    } catch (error) {
        console.log('User SignUp Failed.');
        res.status(500).json({ UserAdded: false });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await users.find({ Email: email, Password: password });
    if (user.length === 0) {
        console.log("No Such User Found");
        res.status(500).json({ loginSuccess: false });
    } else {
        res.status(200).json({
            loginSuccess: true,
            user: {
                name: user[0].name,
                userid: user[0]._id
            }
        });
    }
});

app.post('/api/listings', async (req, res) => {
    const searchQuery = req.body.searchQuery;
    try {
        let listings;
        if (searchQuery === '') {
            listings = await Listings.find({});
        } else {
            listings = await Listings.find({
                $or: [
                    { Listing_Image_Name: { $regex: searchQuery, $options: 'i' } },
                    { description: { $regex: searchQuery, $options: 'i' } },
                    { Area: { $regex: searchQuery, $options: 'i' } },
                    { City: { $regex: searchQuery, $options: 'i' } },
                ]
            });
        }
        res.json(listings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/Add_listings', upload.single("ListingImage"), async (req, res) => {
    const { Action_Type, Property_Type, Area, City, Size, Price, No_of_bedrooms, No_of_bathrooms, description, Condition, UserID } = req.body;
    const listing_image = req.file.filename;

    const newListing = new Listings({
        User_ID: UserID,
        Listing_Image_Name: listing_image,
        Property_Type: Property_Type,
        Action_Type: Action_Type,
        Area: Area,
        City: City,
        Size: Size,
        Price: Price,
        No_of_bedrooms: No_of_bedrooms,
        No_of_bathrooms: No_of_bathrooms,
        description: description,
        Condition: Condition
    });

    try {
        await newListing.save();
        console.log('Listing has been successfully saved to the database.');
        res.status(200).json({ ListingAdded: true });
    } catch (error) {
        console.log('Listing creation failed.', error);
        res.status(500).json({ ListingAdded: false });
    }
});

// Connect to the database and start the server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database connected");
        app.listen(port, () => {
            console.log(`The server is running on port ${port}`);
        });
    })
    .catch(() => {
        console.log("Database not connected");
    });
