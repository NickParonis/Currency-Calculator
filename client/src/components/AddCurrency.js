import React from 'react'; 
import axios from 'axios';
import { Link} from 'react-router-dom'; 

const AddCurrency = () => {
    // Function for handling the addition of a new currency
    const handleAddCurrency = async (name, ratio) => {
        const data = {
            name: name,
            ratio_to_euro: ratio,
        };
        const token = localStorage.getItem('token'); // Retrieving the authentication token from local storage
        try {
            // Sending a POST request to the backend for adding a new currency
            const response = await axios.post('http://localhost:4000/api/currency', data, {
                headers: {Authorization: 'Bearer ' + token} // Setting the authorization header with the token
            });
            console.log('Success:', response); 
            alert('Currency added Successfully');
        } catch (error) {
            console.error('Error:', error);
            alert('Error while adding a new Currency'); 
        }
    };


    return (
        <div className="currencyAddcontainer">
            <h3>Add new Currency</h3>
            <div className="currenciesDropdown">
                <input
                    className="input"
                    type="text"
                    placeholder="Currency name"
                    id="addedName"
                />
                <input
                    className="input"
                    type="number"
                    placeholder="EUR per unit"
                    id="addedValue"
                />
            </div>
            <button
                type="submit"
                className="addBtn"
                onClick={() => {
                    const name = document.getElementById('addedName').value;
                    const ratio = document.getElementById('addedValue').value;
                    handleAddCurrency(name, ratio); 
                }}
            >
                Add new Currency
            </button>
            <div className="goBackButton">
                    <Link to={{pathname: "/Calc" }}>
                        <button className="Cornerbtn btn">Back</button>
                    </Link>
            </div>
        </div>
    );
};

export default AddCurrency; 