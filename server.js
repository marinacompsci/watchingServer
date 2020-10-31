let express = require('express');
let app = express();
var bodyParser = require('body-parser');  
let location;
let connectedToDB = false;
var urlencodedParser = bodyParser.urlencoded({ extended: false })  

// DB
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect()
.then(() => connectedToDB = true);


//app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('You must pass your key as query, like this /locations/11111');
});


app.get('/locations/:key', (req, res) => {
  console.log("GET REQUEST RECEIVED");
  if (connectedToDB) {
    let query = `SELECT * FROM locations WHERE id = ${req.params.key};`;
    client.query(query, (err, dbRes) => {
      if (err) {console.log(JSON.stringify(err)); }
      else {
        let jsonResponse = JSON.stringify(new Location(dbRes.rows[0].id, dbRes.rows[0].long, dbRes.rows[0].lat, dbRes.rows[0].modtime));
        res.contentType('json');
        res.send(jsonResponse);
      }
      
    });
  } else {
    res.send("Connection to DB NOT established.");
  }
});

app.post('/locations', urlencodedParser, (req, res) => {
  console.log("POST REQUEST RECEIVED");
  let key = req.body.key;
  let long = req.body.long;
  let lat = req.body.lat;
  location = JSON.stringify(new Location(key, long, lat));
  if (connectedToDB) {
    let query = `INSERT INTO locations (id,long,lat) VALUES (${key}, ${long}, ${lat});`;
    client.query(query, (err, res) => {
      if (err) {console.log(JSON.stringify(err)); }
      else {
        console.log("Success.");
      }
      /*client.end()
      .catch(() => {
        console.log("Error while ending connection to DB.");
      });*/
    });
  } else {
    res.send("Connection to DB NOT established.");
  }
  
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







