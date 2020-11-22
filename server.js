let express = require('express');
let app = express();
var bodyParser = require('body-parser');  
let location;
let connectedToDB = false;
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
let data = new Map();

// DB
/*
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect()
.then(() => connectedToDB = true);
*/

//app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('You must pass your key as query, like this /locations/{id}');
});

app.get('/locations/:id', (req, res) => {
  console.log("GET REQUEST RECEIVED");
  let key = req.params.id;
  if (data.has(key)) {
    res.send(data.get(key));
  } else {
    res.send('Error: Nothing found under the given key');
  }
  
  /*if (connectedToDB) {
    res.contentType('json');
    let query = `SELECT * FROM locations WHERE id = ${req.params.id};`;
    client.query(query, (err, dbRes) => {
      if (err) {
        console.log(JSON.stringify(err)); 
        res.send(JSON.stringify(err));
      } else {
        if (dbRes.rowCount != 0) { // If there is actually a DB entry with this ID
          let jsonResponse = JSON.stringify(new Location(dbRes.rows[0].id, dbRes.rows[0].long, dbRes.rows[0].lat, dbRes.rows[0].modtime));
          res.send(jsonResponse);
        } else {
          res.send("No entry on DB with this ID.");
        }
      }
    });
  } else {
    res.send("Connection to DB NOT established.");
  }*/
});

app.post('/locations', urlencodedParser, (req, res) => {
  console.log("POST REQUEST RECEIVED");
  location = new Location(req.body.id, req.body.long, req.body.lat);
  data.set(location.id, location);
  res.contentType('json');

  
  /*if (connectedToDB) {
    tableHasEntry(res, location);
  } else {
    res.send("Connection to DB NOT established.");
  }*/

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


/*
function tableHasEntry(res, location) {
  let query = `SELECT * FROM locations WHERE id = ${location.id}`;
  client.query(query, (err, dbRes) => {
    if (err) {
      client.end()
      .then(() => {
        res.send(err + "\n" + "Error while selecting table entries with passed ID");
      })
      return;
    } else if (dbRes.rowCount == 0){
      console.log("Trying to insert new table entry");
      query = `INSERT INTO locations (id,long,lat) VALUES (${location.id}, ${location.longitude}, ${location.latitude});`;
        client.query(query, (err, dbRes) => {
          if (err) {
            console.log(JSON.stringify(err)); 
            res.send(JSON.stringify(err));
          } else {
            console.log("Successfully inserted new location.");
            res.send(location);
          }
        });
    } else {       // A table entry with this ID already exists
      console.log("Trying to update existing table entry");
      query = `UPDATE locations SET (long,lat) = (${location.longitude}, ${location.latitude}) WHERE id = ${location.id};`; 
      client.query(query, (err, dbRes) => {
          if(err) {
            console.log(JSON.stringify(err)); 
            res.send(err);
          } else {
            console.log("Successfully updated existing location.");
            res.send("Successfully updated existing location.");
          }
      });
    }
  });
}*/