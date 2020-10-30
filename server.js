let express = require('express');
let app = express();
let location;


app.get('/locations/:key', (req, res) => {
  //console.log(req.params)
  location = JSON.stringify(new Location(req.params.key, 1211, 2222, 18012020));
  res.contentType('json');
  res.send(location);
});

app.listen(5500, 'localhost', () => {
  console.log("Server running...");
});

function Location(id, longitude, latitude, time) {
  this.id = id;
  this.longitude = longitude;
  this.latitude = latitude;
  this.time = time;
}

