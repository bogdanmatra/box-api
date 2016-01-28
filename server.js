var express = require('express');
var fs=require("fs");
var bodyParser = require('body-parser')
var Converter=require("csvtojson").core.Converter;

//Server
var app = express();
app.use(bodyParser.json());
app.listen(3000);

//CSV to JSON
var myBoxes; // In memory data
var csvConverter=new Converter({constructResult:true});
var csvString="example.csv";
var fileStream=fs.createReadStream(csvString);
fileStream.pipe(csvConverter);
csvConverter.on("end_parsed",function(jsonObj){
    var myItemsArray;
    // Adjust '/' separation of items into JSON array []
    jsonObj.forEach(function(entry) {
        myItemsArray = entry.items.split('/');
        entry.items = myItemsArray;
    });
    myBoxes = jsonObj;

    //Add routes after data was loaded and parsed to JSON
    require('./get.js')(app, myBoxes);
    require('./post.js')(app, myBoxes);
    require('./delete.js')(app, myBoxes);
    require('./find.js')(app, myBoxes);
});














