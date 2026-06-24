import React, { useState } from 'react';
import { API_BASE_URL } from '../config';
import './Register.css';

const Register = () => {
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

       
        if (!firstName || !lastName || !email || !phone || !password) {
            setErrorMessage('All fields are required.');
            return;
        }

        const newUser = {
            prenom: firstName,
            nom: lastName,
            email: email,
            telephone: phone,
            motDePasse: password
        };

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/inscription`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(data.message || 'An error occurred during registration.');
            } else {
                
                setSuccessMessage(data.message);
                
                setFirstName('');
                setLastName('');
                setEmail('');
                setPhone('');
                setPassword('');
            }
        } catch (error) {
            setErrorMessage('Cannot connect to the server. Please try again later.');
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Create an Account</h2>
                
                {errorMessage && <div className="message error-message">{errorMessage}</div>}
                {successMessage && <div className="message success-message">{successMessage}</div>}

                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="John"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Doe"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john.doe@example.com"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0612345678"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />
                </div>

                <button type="submit" className="btn-submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Register;