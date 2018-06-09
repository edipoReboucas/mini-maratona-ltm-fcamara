var express = require('express');
var app  = express();
var path = require("path");

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.post('/', function (req, res) {
  res.send('csv file here');
});

app.listen(3000, function () {
  console.log('Mini Maratona LTM/FCamara Server listening on port 3000!');
});
