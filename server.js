let express = require('express');
let app = express();
var bodyParser = require('body-parser');  
let location;
var urlencodedParser = bodyParser.urlencoded({ extended: false })  

// DB
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});



//app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('You must pass your key as query, like this /locations/11111');
});


app.get('/locations/:key', (req, res) => {
  location = JSON.stringify(new Location(req.params.key, 1211, 2222, 18012020));
  console.log("GET\t" + location);
  res.contentType('json');
  res.send(location);
});

app.post('/locations', urlencodedParser, (req, res) => {
  let key = req.body.key;
  let long = req.body.long;
  let lat = req.body.lat;
  location = JSON.stringify(new Location(key, long, lat));
  client.connect()
  .then(() => {
    let query = `INSERT INTO locations (id,long,lat) VALUES (${key}, ${long}, ${lat});`;
    client.query(query, (err, res) => {
      if (err) {res.send("ERROR:" + JSON.stringify(err));}
      else {
        console.log("Success.");
      }
      client.end()
      .catch(() => {
        console.log("Error while ending connection to DB.");
      });
    });
  });
  
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







