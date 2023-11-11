import axios from 'axios'; // Axios for handling HTTP requests
import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; // Hook for navigating between routes

const Login = (props) => {

    const [loginError, setLoginError] = useState(false); 
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    const navigate = useNavigate(); // Initializing the navigate function from react-router-dom

    // Function for setting the user as logged in
    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    // Function for navigating to the CurrencyCalc component
    const handleNavigation = () => {
        navigate('/Calc');
    };

    // Function for handling the form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        try {
            // Sending a POST request to the backend for user authentication
            const response = await axios.post('http://localhost:4000/api/user/login', {
                email: email,
                password: password
            });
            console.log('Login successful:', response.data);
            // Storing the authentication token and user role in local storage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userRole', response.data.user_role);
            handleLogin(); // Setting the user as logged in
            handleNavigation(); // Navigating to the CurrencyCalc component
        } catch (error) {
            console.error('Login failed:', error);
            setLoginError(true); // Setting the login error state to true
        }
    };

    // Effect hook for automatically navigating to the CurrencyCalc component when the user is logged in
    useEffect(() => {
        if (isLoggedIn) {
            handleNavigation();
        }
    }, [isLoggedIn]);


    return (
        <div className="Logincontainer">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="loginform">
                <input className="input" id="email" type="text" name="u" placeholder="email" required="required" />
                <input className="input" id="password" type="password" name="p" placeholder="Password" required="required" />
                <button type="submit" className="ConfirmBtn">Confirm</button>
                <div className="otherOptions" onClick={handleNavigation}>
                    <h5>Continue as guest</h5>
                </div>
            </form>
            {loginError && <p style={{ color: 'red', textAlign: 'center' }}>Login Failed. Please check your credentials.</p>}
        </div>
    );
};

export default Login; 