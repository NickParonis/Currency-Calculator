const express = require('express'); 
const router = express.Router(); 
const usersContoller = require('../controllers/usersController'); 
const authController = require('../controllers/authenticationController');

// Defining routes for user-related operations
router.post('/signup', authController.signup); // Handling POST requests for user signup
router.post('/login', authController.login); // Handling POST requests for user login
router
    .route('/')
    .get(usersContoller.getAllUsers); // Handling GET requests for fetching all users

router
    .route('/:id')
    .get(usersContoller.getUser) // Handling GET requests for fetching a specific user by ID
    .patch(usersContoller.updateUser) // Handling PATCH requests for updating a user
    .delete(usersContoller.deleteUser); // Handling DELETE requests for deleting a user

module.exports = router; 