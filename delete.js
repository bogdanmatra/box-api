module.exports = function (app, myBoxes) {
    // Delete Box
    app.delete('/box/:id', function (req, res) {
        var response;
        var id = req.param('id');
        if (isNaN(id)) {
            response = 'Please send a numeric ID!';
        } else {
            myBoxes.some(function (entry, index) {
                if (entry.id == id) {
                    myBoxes.splice(index, 1);
                    response = 'Deleted box with id: ' + id + '.';
                    return true; // if element was deleted break loop
                }
            });
        }
        if (!response) {
            response = 'No box found to delete with id: ' + id + '.';
        }
        res.send(response);
    });
};