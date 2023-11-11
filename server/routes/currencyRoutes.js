const express = require('express');
const router = express.Router(); // Creating an instance of an Express router
const currencyContoller = require('../controllers/currencyController'); // Importing the currency controller
const authController = require('../controllers/authenticationController'); // Importing the authentication controller

// Defining routes for handling currencies
router.route('/')
    .get(currencyContoller.getAllCurrencies) // Handling GET requests for fetching all currencies
    .post(authController.protect, authController.restrictTo('admin'), currencyContoller.createCurrency); // Handling POST requests for creating a new currency, accessible only to admin users

router.route('/:id')
    .get(currencyContoller.getCurrency) // Handling GET requests for fetching a specific currency by ID
    .delete(authController.protect, authController.restrictTo('admin'), currencyContoller.deleteCurrency) // Handling DELETE requests for deleting a currency, accessible only to admin users
    .patch(authController.protect, authController.restrictTo('admin'), currencyContoller.updateCurrency); // Handling PATCH requests for updating a currency, accessible only to admin users

// Defining a route for translating currencies
router.post('/translate', currencyContoller.translateCurrencies); // Handling POST requests for translating currencies

module.exports = router;