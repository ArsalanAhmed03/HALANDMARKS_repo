import React, { useEffect, useState } from 'react';
import '../styles/signUpForm-Styles.css';
import { useNavigate } from 'react-router-dom';

export default function Signupbox() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        repassword: '',
        fullname: '',
        phone: '',
        emirate: 'Abu Dhabi',
        city: '',
        address: '',
        pobox: '',
        nationality: '',
        dob: '',
        gender: 'Male',
        language: 'English'
    });

    const [messages, setMessages] = useState({
        email: '',
        pass: '',
        repass: ''
    });

    const [disableBtn, setDisableBtn] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const root = document.querySelector('#root');
        if (root) {
            root.style.display = 'flex';
            root.style.flexDirection = 'column';
            root.style.backgroundColor = 'rgb(234, 234, 234)';
        }
    }, []);

    useEffect(() => {
        const allFieldsFilled = Object.values(formData).every(field => field !== '');
        const noErrorMessages = Object.values(messages).every(message => message === '');
        setDisableBtn(!(allFieldsFilled && noErrorMessages));
    }, [formData, messages]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const validatePassword = (password) => password.length >= 8;
    const validateEmail = async (email) => {
        const response = await fetch('/validate-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });
        const result = await response.json();
        return response.ok ? '' : result.message || 'Email already in use';
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setFormData((prevState) => ({ ...prevState, password: newPassword }));
        const passMessage = validatePassword(newPassword) ? '' : 'Password too short';
        setMessages((prevState) => ({ ...prevState, pass: passMessage }));
    };

    const handleEmailChange = async (e) => {
        const newEmail = e.target.value;
        setFormData((prevState) => ({ ...prevState, email: newEmail }));
        const emailMessage = await validateEmail(newEmail);
        setMessages((prevState) => ({ ...prevState, email: emailMessage }));
    };

    const handleRepasswordChange = (e) => {
        const newRepassword = e.target.value;
        setFormData((prevState) => ({ ...prevState, repassword: newRepassword }));
        const repassMessage = newRepassword !== formData.password ? 'Passwords do not match' : '';
        setMessages((prevState) => ({ ...prevState, repass: repassMessage }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await fetch('https://halandmarks-backend.onrender.com/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            console.log('Signup success');
            navigate('/');
        } else {
            const result = await response.json();
            console.log('Signup failed:', result.message);
            setMessages((prevState) => ({ ...prevState, email: result.message || 'Signup failed. Please try again.' }));
        }
        setIsLoading(false);
    };

    return (
        <div className="signUpArea">
            <div className="signup-container">
                <h2>Join Our Family</h2>
                <p>Create your account to get started with our real estate services.</p>
                <form id="signupform" onSubmit={handleSubmit}>
                    <InputField
                        label="Full Name"
                        type="text"
                        name="fullname"
                        placeholder="Enter Your Full Name"
                        value={formData.fullname}
                        onChange={handleChange}
                        required
                    />
                    <InputField
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Enter Your Email"
                        value={formData.email}
                        onChange={handleEmailChange}
                        errorMessage={messages.email}
                        required
                    />
                    <InputField
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Enter Your Password"
                        value={formData.password}
                        onChange={handlePasswordChange}
                        errorMessage={messages.pass}
                        required
                    />
                    <InputField
                        label="Confirm Password"
                        type="password"
                        name="repassword"
                        placeholder="Confirm Your Password"
                        value={formData.repassword}
                        onChange={handleRepasswordChange}
                        errorMessage={messages.repass}
                        required
                    />
                    <InputField
                        label="Phone Number"
                        type="tel"
                        name="phone"
                        placeholder="+971"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <SelectField
                        label="Emirate"
                        name="emirate"
                        value={formData.emirate}
                        onChange={handleChange}
                        options={['Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Fujairah', 'Ras Al Khaimah', 'Umm Al Quwain']}
                        required
                    />
                    <InputField
                        label="City"
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                    <InputField
                        label="Address"
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                    <InputField
                        label="PO Box"
                        type="text"
                        name="pobox"
                        value={formData.pobox}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Nationality"
                        type="text"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        required
                    />
                    <InputField
                        label="Date of Birth"
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                    <SelectField
                        label="Gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        options={['Male', 'Female', 'Other', 'Prefer not to say']}
                        required
                    />
                    <SelectField
                        label="Preferred Language"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        options={['English', 'Arabic']}
                        required
                    />
                    <button id="signbtn" type="submit" disabled={disableBtn || isLoading}>
                        {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
}

const InputField = ({ label, type, name, placeholder, value, onChange, errorMessage, required }) => (
    <div className="input-group">
        <label htmlFor={name}>{label}</label>
        <input
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
        />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
);

const SelectField = ({ label, name, value, onChange, options, required }) => (
    <div className="input-group">
        <label htmlFor={name}>{label}</label>
        <select id={name} name={name} value={value} onChange={onChange} required={required}>
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </div>
);
