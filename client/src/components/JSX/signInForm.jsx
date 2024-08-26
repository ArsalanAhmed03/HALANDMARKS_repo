import React, { useState } from 'react';
import '../styles/signInForm-Styles.css';

export default function SignIn({ onClose, onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://halandmarks-backend.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.loginSuccess) {
                    onLogin(data.user.name,data.user.userid); // Update parent component state
                    onClose(); // Close the SignIn modal
                    setErrorMessage('');
                } else {
                    setErrorMessage('Invalid email or password'); // Handle incorrect login
                }
            } else {
                console.error('Login failed');
                setErrorMessage('Invalid email or password'); // Handle general error
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('Failed to login. Please try again.'); // Handle fetch or other errors
        }
    };

    return (
        <>
            <div className="signinbody">
                <div className="signin-box">
                    <button className="cross" onClick={onClose}></button>
                    <h2>Sign In Into Your Account</h2>
                    <h3>Welcome Back!</h3>
                    <form onSubmit={handleSubmit}>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Your Email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Your Password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                        <button type="submit">LOG IN</button>
                    </form>
                    <a href="/">Forgot Password?</a>
                    <a href="/">Dont have a Account? SignUp</a>
                </div>
            </div>
        </>
    );
}