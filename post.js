module.exports = function (app, myBoxes) {
    // Add Box - accepts requests with Content-Type: application/json
    app.post('/box', function (req, res) {
        var data = req.body;
        if (data.id && data.createdat && data.customername && data.address && data.items && data.items.length > 0) {
            myBoxes.some(function (entry) {
                if (entry.id == data.id) {
                    res.send('ID already exists.'); // TODO ID should be generated on server
                    return true; // if element with the same id was found break loop
                }
            });
            myBoxes.push(data);
            res.send('Successfully added box.');
        }
        res.send('Data is not valid.');
    });
};