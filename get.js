module.exports = function (app, myBoxes) {
// Get all boxes
    app.get('/box', function(req, res){
        res.send(myBoxes);
    });

// Get box by id
    app.get('/box/:id', function(req, res){
        var response;
        var id = req.param('id');
        if (isNaN( id )){
            response = 'Please send a numeric ID!';
        }else {
            myBoxes.some(function (entry) {
                if (entry.id == id) {
                    response = entry;
                    return true; // if element was found break loop
                }
            });
        }
        if ( !response ){
            response = 'No box found with id: ' + id + '.';
        }
        res.send(response);
    });
};
