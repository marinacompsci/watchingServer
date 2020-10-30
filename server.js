let express = require('express');
let app = express();
var bodyParser = require('body-parser');  
let location;
var urlencodedParser = bodyParser.urlencoded({ extended: false })  

// DB
const { Client } = require('pg');


//app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('You must pass your key as query, like this /locations/11111');
});


app.get('/locations/:key', (req, res) => {
  location = JSON.stringify(new Location(req.params.key, 1211, 2222, 18012020));
  console.log(location);
  res.contentType('json');
  res.send(location);
});

app.post('/locations', urlencodedParser, (req, res) => {
  location = JSON.stringify(new Location(req.body.key, req.body.long, req.body.lat, req.body.time));
  console.log(location);
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


const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();
/*
client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});
*/


