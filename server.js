// server.js
// where your node app starts

// init project
const express = require('express');
const app     = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({
    greeting: 'hello API'
  });
});

app.get('/api', (req, res) => {
  let now = new Date()
  res.json({
    "unix": now.getTime(),
    "utc": now.toUTCString()
  });
});

app.get('/api/:date?', (req, res) => {
  let date_string = req.params.date.match(/^\d*$/)
    ? new Date(Number(req.params.date))
    : new Date(req.params.date);

  if(date_string != "Invalid Date"){
    res.json({
      "unix": date_string.getTime(),
      "utc": date_string.toUTCString()
    })
  }else{
    res.json({
      error: "Invalid Date"
    });
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
