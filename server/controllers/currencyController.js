const Currency = require('./../models/currencyModel'); // Importing the Currency model for database operations

// Controller function for translating currencies
exports.translateCurrencies = async (req, res) => {
    try{
        // Fetching the necessary currencies and data from the request and store the translated total in the const result
        const firstCurrency = await Currency.find( {name: req.body.baseCur} );
        const requestedCurrency = await Currency.find( {name: req.body.requestedCur} );
        const totalAmmount = req.body.transformAmmount;
        const toEuroRatio_first = firstCurrency[0].ratio_to_euro;
        const toEuroRatio_requested = requestedCurrency[0].ratio_to_euro;
        const result = (totalAmmount * toEuroRatio_first) / toEuroRatio_requested

        // Sending the translated data as a response
        res.status(200).json({
            status: "success",
            data: {
                firstCurrency,
                requestedCurrency,
            },
            result
        })
    } catch (err){
        console.log(err);
        res.status(404).json({
            status: 'failed',
            message: err
        });
    }
};

// Controller function for fetching all currencies
exports.getAllCurrencies = async (req, res) => {
    try{
        const Currencies = await Currency.find();
        res.status(200).json({
            status: "success",
            results: Currencies.length,
            data: {
                Currencies
            }
        })
    } catch (err){
        res.status(404).json({
            status: 'failed',
            message: err
        });
    }
};

// Controller function for fetching a specific currency by ID
exports.getCurrency = async (req, res) => {
    try{
        const DBCurrency = await Currency.find( {_id: req.params.id} );
        res.status(200).json({
            status: "success",
            data: {
                DBCurrency
            }
        })
    } catch (err){
        res.status(400).json({
            status: "failed",
            message: err
        });
    }
};

// Controller function for deleting a currency by ID
exports.deleteCurrency = async (req, res) => {
    try{
        await Currency.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
            data: null
        });
    } catch (err){
        res.status(400).json({
            status: "failed",
            message: err
        });
    }
};

// Controller function for creating a new currency
exports.createCurrency = async (req, res) => {
    try{
        const newCurrency = await Currency.create(req.body)
        res.status(200).json({
            status: 'success',
            CurrencyCreated: newCurrency
        });
    } catch (err) { 
        res.status(400).json({
            status: 'failed',
            message: err
        });
    }
};

// Controller function for updating a currency by ID
exports.updateCurrency = async (req, res) => {
    try{
        const currency = await Currency.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: "success",
            data: {
                currency
            }
        })
    } catch (err){
        res.status(400).json({
            status: "failed",
            message: err
        });
    }
};