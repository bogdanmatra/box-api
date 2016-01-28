module.exports = function (app, myBoxes) {
    // Find Box - sort boxes by STREETNAME, DATE, WEIGHT
    app.get('/find/:property', function (req, res) {
        var property = req.param('property');
        // Sort by JSON property
        var sortByProperty = function (prop) {
            return function (a, b) {
                if (a[prop] > b[prop]) {
                    return 1;
                } else if (a[prop] < b[prop]) {
                    return -1;
                }
                return 0;
            }
        }
        // Sort by number of items
        var sortByArrayPropety = function (prop) {
            return function (a, b) {
                if (a[prop].length > b[prop].length) {
                    return 1;
                } else if (a[prop].length < b[prop].length) {
                    return -1;
                }
                return 0;
            }
        }
        switch (property) {
            case 'streetname' :
                myBoxes.sort(sortByProperty('address'));
                res.send(myBoxes);
                break;
            case 'date':
                myBoxes.sort(sortByProperty('createadr'));
                res.send(myBoxes);
                break;
            case 'weight':
                myBoxes.sort(sortByArrayPropety('items'));
                res.send(myBoxes);
                break;
            default:
                res.send('Make sure you use one of the following: find/streetname, find/date, find/weight');
        }
    });
};