const jwt = require ('jsonwebtoken'); // JSON Web Token for creating and verifying tokens
const User = require('./../models/usersModel'); // User model for database operations
const util = require('util'); // Utility module for promisifying functions

// Function to sign JWT token
const signToken = (_id) => {
    return jwt.sign({ id: _id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION_TIME
    });
};

// Controller function for user signup
exports.signup = async (req, res, next) => {
    try{
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });
        const token = signToken(newUser._id);
        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: newUser
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'failed',
            message: err
        });
    }
};

// Controller function for user login
exports.login = async (req, res, next) => {
    const _email = req.body.email;
    const _password = req.body.password;

    if (!_email || !_password) {
        res.status(400).json({
            status: 'failed',
            message: 'Please provide email and password',
        });
    };

    try {
        const user = await User.findOne( {email: _email} );
        if (_password == user.password) {
            const token = signToken(user._id)
            res.status(200).json({
                status: 'Success',
                token,
                user_role: user.role
            });
        } else {
            res.status(400).json({
                status: 'failed',
                message: 'Username and password do not match'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'failed',
            message: err
        });
    }
};

// Middleware to protect routes
exports.protect = async (req, res, next) => {
    // Get token and check if exists
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    try {
        if (!token){
            res.status(401).json({
                status: 'failed',
                message: 'You are not logged in, please log in to get access!',
            });
        }
        else {
            // decode the token and get the user id from the token (decoded.id)
            const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);

            // check if the user still exists in the database
            const freshUser = await User.findById(decoded.id);
            console.log(decoded.id);
            if (!freshUser) {
                console.log(err);
                res.status(400).json({
                    status: 'failed verification',
                    message: 'User not found'
                });
            } else {
                // Grants access to the protected route and store user to the request object
                req.user = freshUser;
                console.log(req.user);
                next();
            }

        }
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'failed verification',
            message: err
        });
    }
};

// Middleware to restrict access based on user role
exports.restrictTo = (role) => {
    return (req, res, next) => {
        if (req.user.role != role) {
            res.status(403).json({
                status: 'failed',
                message: 'You are not allowed to perform that action',
            });
        } else {
            next();
        }
    }
};