import axios from 'axios'; // Axios for handling HTTP requests
import React, { useState, useEffect } from 'react'; 
import CurrencyOption from '../components/CurrencyOption'; 
import {Link} from 'react-router-dom';

// Function for fetching data from the API endpoint
async function GetData( url ) {
    try {
        const response = await axios.get( url );
        const Currencies = response.data.data.Currencies;
        return await Currencies
    } catch (err) {
        console.log(err);
    }
};

// Function for handling the logout action
const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
};

// CurrencyCalc component for handling currency transformation and rendering UI
const CurrencyCalc = () => {
    let [Currencies, setCurrencies] = useState([]); // State variable for storing the fetched currencies
    let [TransformationResult, setTransformationResult] = useState(''); // State variable for storing the transformation result


    useEffect( () => {
        GetData( 'http://localhost:4000/api/currency' ).then((Currencies) => {
            setCurrencies(Currencies);
        });
    }, []); 

    // Function for handling the form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const baseCur = document.getElementById('Currencies').value;
        const requestedCur = document.getElementById('Currencies2').value;
        const transformAmmount = document.getElementById('ammount').value;
    
        try {
            // Sending a POST request for currency transformation
            const response = await axios.post('http://localhost:4000/api/currency/translate', {
                baseCur: baseCur,
                requestedCur: requestedCur,
                transformAmmount: transformAmmount,
            });
            console.log(response.data.result); // Handle the response as needed
            setTransformationResult(response.data.result);
        } catch (err) {
            console.error('Error occurred while making the POST request', err);
        }
    };

    const userRole = localStorage.getItem('userRole'); // Retrieving the user role from local storage
    const isAdmin = userRole === 'admin'; // Checking if the user has admin privileges


    return (
        <div className="container">
            <div className="currencyTransform">
                <h3>Transform Currency</h3>
                <form onSubmit={handleFormSubmit} className="transformCurrForm">
                    <div className="currenciesDropdown">
                        <select className="input" id="Currencies">
                            {Currencies.map((el, index) => (
                                <CurrencyOption key={index} name={el.name}/>
                            ))}
                        </select>
                        <input className="input" id="ammount" type="number" step="0.01" required="required" />
                    </div>
                    <div className="currenciesDropdown">
                        <select className="input" id="Currencies2">
                            {Currencies.map((el, index) => (
                                <CurrencyOption key={index} name={el.name}/>
                            ))}
                        </select>
                        <input className="input" type="number" value={(TransformationResult * 1).toFixed(4)} required="required" disabled/>
                    </div>
                    <button type="submit" className="transformBtn">
                        Transform Currency
                    </button>
                </form>
            </div>
            {isAdmin && (
                <div className="adminButtons">
                    <Link to={{pathname: "/Update" }}>
                        <button className="UpdateCurrbtn btn">Update a Currency</button>
                    </Link>
                    <Link to={{pathname: "/Add" }}>
                        <button className="AddCurrbtn btn">Add a Currency</button>
                    </Link>
                </div>
            )}
            <div className="logOutButton">
                    <Link to={{pathname: "/" }}>
                        <button className="Cornerbtn btn" onClick={handleLogout}>LogOut</button>
                    </Link>
            </div>
        </div>
    );
}
export default CurrencyCalc;