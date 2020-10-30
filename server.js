let express = require('express');
let app = express();

app.get('/', (req, res) => {
  res.send('Responded');
});

app.listen(5500, 'localhost', () => {
  console.log("Server running...");

});
