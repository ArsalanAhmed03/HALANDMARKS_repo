import React, { useState } from 'react';
import '../styles/signInForm-Styles.css';

export default function SignIn({ onClose, onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.loginSuccess) {
                    onLogin(data.user.name, data.user.userid);
                    onClose();
                } else {
                    setErrorMessage('Invalid email or password');
                }
            } else {
                setErrorMessage('Invalid email or password');
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('Failed to login. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
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
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" // Basic email pattern
                    />
                    <div className="password-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Enter Your Password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                        <button type="button" onClick={handleTogglePasswordVisibility}>
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Logging In...' : 'LOG IN'}
                    </button>
                </form>
                <a href="/">Forgot Password?</a>
                <a href="/">Don't have an Account? Sign Up</a>
            </div>
        </div>
    );
}
