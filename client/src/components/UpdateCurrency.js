import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { Link } from 'react-router-dom'; 
import CurrencyOption from '../components/CurrencyOption';

// Function for fetching data from the API endpoint
async function GetData(url) {
  try {
    const response = await axios.get(url);
    const Currencies = response.data.data.Currencies;
    return Currencies;
  } catch (err) {
    console.log(err);
  }
};

// Function for sending a patch request to update currency data
async function patchCurrencyData(id, ratioToEuro) {
  const patchUrl = `http://localhost:4000/api/currency/${id}`;
  const patchBody = {
    ratio_to_euro: ratioToEuro,
  };
  const token = localStorage.getItem('token');

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const patchResponse = await axios.patch(patchUrl, patchBody, {
      headers: headers,
    });
    console.log('Patch Request Successful', patchResponse.data);
    alert('Patch Request Successful');
  } catch (error) {
    console.error('Error in Patch Request', error);
    alert('Error in Patch Request');
  }
}


const UpdateCurrency = (props) => {
  let [Currencies, setCurrencies] = useState([]); // State variable for storing the fetched currencies
  let [ratioToEuro, setRatioToEuro] = useState(''); // State variable for managing the ratio to Euro for the currency

  // Effect hook for fetching data on component mount
  useEffect(() => {
    GetData('http://localhost:4000/api/currency').then((Currencies) => {
      setCurrencies(Currencies);
    });
  }, []);

  // Function for handling the update of currency data
  const handleUpdateCurrency = async () => {
    const CurrencyName = document.getElementById('Currencies2').value;
    const foundCurrency = Currencies.find((currency) => currency.name === CurrencyName);
    const id = foundCurrency._id;
    await patchCurrencyData(id, ratioToEuro);
  };


  return (
    <div className="currencyUpdate">
      <h3>Update Currency</h3>
      <div className="currenciesDropdown">
        <select className="input" id="Currencies2">
          {Currencies.map((el, index) => (
            <CurrencyOption key={index} name={el.name} />
          ))}
        </select>
        <input
          className="input"
          type="number"
          placeholder="EUR per unit"
          value={ratioToEuro}
          onChange={(e) => setRatioToEuro(e.target.value)}
        ></input>
      </div>
      <button type="submit" className="updateBtn" onClick={handleUpdateCurrency}>
        Update Currency
      </button>
      <div className="goBackButton">
        <Link to={{ pathname: '/Calc' }}>
          <button className="Cornerbtn btn">Back</button>
        </Link>
      </div>
    </div>
  );
};

export default UpdateCurrency;