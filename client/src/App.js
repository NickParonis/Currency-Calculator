import React from 'react'; 
import './App.css';
import Login from './components/login';
import CurrencyCalc from './components/CurrencyCalc';
import AddCurrency from './components/AddCurrency';
import UpdateCurrency from './components/UpdateCurrency';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; // Importing the necessary modules for setting up routes in React

function App() {

    // Defining the structure of the application with routes and components
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}/> 
                <Route path="/Calc" element={<CurrencyCalc />}/> 
                <Route path="/Add" element={<AddCurrency />}/> 
                <Route path="/Update" element={<UpdateCurrency />}/> 
            </Routes>
        </BrowserRouter>
    );
}

export default App; 