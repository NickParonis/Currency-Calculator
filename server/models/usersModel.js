const mongoose = require('mongoose');
const validator = require('validator');

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name must have a value']
    },
    email: {
        type: String,
        required: [true, 'Email must have a value'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Not a correct email format']
    },
    password: {
        type: String,
        required: [true, 'Please provide your password'],
        minlenght: 4
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});
const User = mongoose.model('User', usersSchema);
module.exports = User