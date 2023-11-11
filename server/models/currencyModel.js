const mongoose = require('mongoose');
const currencySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Database Error: "A currency must have a name"'],
        unique: true,
        maxLenght: [10, 'A currency name must have 10 characters or less'],
        minLenght: [2, 'A currency name must have at least 2 characters']
    },
    ratio_to_euro: {
        type: Number,
        required: [true, 'Database Error: "A currency must have a value"'],
        min: [0, "Rating must be above 0" ]
    }
});
const Currency = mongoose.model('Currency', currencySchema);
module.exports = Currency