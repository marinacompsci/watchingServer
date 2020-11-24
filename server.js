let express = require('express');
let app = express();
var bodyParser = require('body-parser');  
let location;
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
let data = new Map();

//app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('You must pass your key as query, like this /locations/{id}');
});

app.get('/locations/:id', (req, res) => {
  console.log("GET REQUEST RECEIVED");
  let key = req.params.id;
  if (data.has(key)) {
    res.status(200).send(data.get(key));
  } else {
    console.log('Error: Nothing found under the key ' + key);
    res.status(404).send('Error: Nothing found under the given key');
  }
  
});

app.post('/locations', urlencodedParser, (req, res) => {
  console.log("POST REQUEST RECEIVED");
  location = new Location(req.body.id, req.body.long, req.body.lat);
  data.set(location.id, location);
  res.contentType('json');
  res.send(data.get(location.id)); 
});

app.listen(process.env.PORT || 5500, () => {
  console.log("Server running...");
});


function Location(id, longitude, latitude, time) {
  this.id = id;
  this.longitude = longitude;
  this.latitude = latitude;
  this.time = time;
}
