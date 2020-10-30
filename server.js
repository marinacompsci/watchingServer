let express = require('express');
let app = express();
let location;


app.get('/', (req, res) => {
  res.send('You must pass your key as query, like this /locations/11111');
});


app.get('/locations/:key', (req, res) => {
  location = JSON.stringify(new Location(req.params.key, 1211, 2222, 18012020));
  res.contentType('json');
  res.send(location);
});

app.post('/locations/:key', (req, res) => {
  location = JSON.stringify(new Location(req.params.key, 1211, 2222, 18012020));
  res.contentType('json');
  res.send(location);
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

