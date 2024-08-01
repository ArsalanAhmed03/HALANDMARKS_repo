const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcrypt');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const port = process.env.PORT || 80; // Use environment variable for port
const app = express();

// Multer settings
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const upload = multer({ storage });
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = require("./models/user.model.js");
const Listings = require("./models/Listings.modles.js");

// Email validation
app.post('/validate-email', async (req, res) => {
    const email = req.body.email;
    const user = await users.findOne({ Email: email });
    return user ? res.status(400).json({ message: 'Email already in use' }) :
                  res.status(200).json({ message: 'Email available' });
});

// Signup
app.post('/signup', async (req, res) => {
    const { email, password, fullname, phone, emirate, city, address, pobox, nationality, dob, gender, language } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const user = new users({
            name: fullname,
            Email: email,
            Password: hashedPassword, // Store hashed password
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

        await user.save();
        console.log('User has been successfully saved to the database.');
        res.status(201).json({ UserAdded: true });
    } catch (error) {
        console.error('User SignUp Failed:', error);
        res.status(500).json({ UserAdded: false });
    }
});

// Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await users.findOne({ Email: email });

    if (!user) {
        console.log("No Such User Found");
        return res.status(401).json({ loginSuccess: false, message: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.Password); // Compare hashed password
    if (!match) {
        console.log("Password mismatch");
        return res.status(401).json({ loginSuccess: false, message: 'Invalid email or password' });
    }

    console.log(user.name);
    res.status(200).json({
        loginSuccess: true,
        user: {
            name: user.name,
            userid: user._id
        }
    });
});

// Listings search
app.post('/api/listings', async (req, res) => {
    const searchQuery = req.body.searchQuery;

    try {
        const listings = searchQuery === ''
            ? await Listings.find({})
            : await Listings.find({
                $or: [
                    { Listing_Image_Name: { $regex: searchQuery, $options: 'i' } },
                    { description: { $regex: searchQuery, $options: 'i' } }
                ]
            });
        res.json(listings);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});

// Add listings
app.post('/Add_listings', upload.single("ListingImage"), async (req, res) => {
    const newListing = new Listings({
        User_ID: req.body.UserID,
        Listing_Image_Name: req.file.filename,
        Property_Type: req.body.Property_Type,
        Action_Type: req.body.Action_Type,
        Area: req.body.Area,
        City: req.body.City,
        Size: req.body.Size,
        Price: req.body.Price,
        No_of_bedrooms: req.body.No_of_bedrooms,
        No_of_bathrooms: req.body.No_of_bathrooms,
        description: req.body.description,
        Condition: req.body.Condition
    });

    try {
        await newListing.save();
        console.log('Listing has been successfully saved to the database.');
        res.status(201).json({ ListingAdded: true });
    } catch (error) {
        console.error('Listing creation failed:', error);
        res.status(500).json({ ListingAdded: false });
    }
});

// Connect to the database and start the server
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/RealEstate', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database connected");
        app.listen(port, () => {
            console.log(`The server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });
