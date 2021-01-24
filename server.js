const objects = require('./objects.js');
const functions = require('./functions.js');

const express = require('express');
const bodyParser = require('body-parser');  
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
let app = express();
let location;
let data = new Map(); // {(hashed) id: location}

//app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('You must pass your key as query, like this /locations/{id}');
});

app.get('/locations/:id', (req, res) => {
  console.log("GET REQUEST WITH ID RECEIVED -- TRYING TO GET LOCATION");
  const hashedKey = req.params.id;
  console.log(hashedKey);
  if (data.has(hashedKey)) {
    res.status(200).send(data.get(hashedKey));
  } else {
    console.log('Error: Nothing found under the key ' + hashedKey);
    res.status(401).send('Error: Invalid key.');
  }
  
});

app.put('/locations/:id', (req, res) => {
  console.log("PUT REQUEST WITH ID RECEIVED -- TRYING TO DELETE LOCATION");
  const hashedKey = req.params.id;
  console.log(hashedKey);
  if (data.has(hashedKey)) {
    data.delete(hashedKey);
    res.status(201).send();
  } else {
    console.log('Error: Nothing found under the key ' + hashedKey);
    res.status(401).send('Error: Invalid key.');
  }
  
});


app.post('/locations', urlencodedParser, (req, res) => {
  console.log("POST REQUEST RECEIVED -- SAVING LOCATION");
  location = new objects.Location(req.body.id, req.body.long, req.body.lat);
  // save hashed token to server's in memory hashmap
  data.set(location.id, location);  // location.id => hashed random key
  data.forEach((value, key) => console.log(key, value)); 
  res.contentType('json');
  //res.send(data.get(location.id)); 
  res.send(data.get(location.id)); 
});

app.listen(process.env.PORT || 5500, () => {  console.log("Server running..."); });



