// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// my timestamp m-service
// const handleDateReq = (req, res, next) => {
//   console.log("req.params.api:::",req.params.api);
//   console.log("test:::",new Date(req.params.api));
//   // res.json({test: req});
// };
app.get("/api/:date", (req, res, next) => {
  const reqDate = req.params.date;
  let retDate;
  const reqNumber = Number(reqDate);
  if (Number.isInteger(reqNumber)) {
    console.log("integer found");
    retDate = new Date(reqNumber);
    res.json({unix: retDate.getTime(), utc: retDate.toString()});
  } else {
    retDate = new Date(reqDate);
    console.log("retDate:", retDate);
    if (retDate.toString() == 'Invalid Date') {
      res.json({error: retDate.toString()});
    } else {
      res.json({unix: retDate.getTime(), utc: retDate.toString()});
    }
  };
  console.log("---req.params.api:::",typeof req.params.date);
  console.log("---req.params.api:::", req.params.date);
  console.log("---retDate type:::",typeof retDate);
  // console.log("---test:::", new Date());
  // res.json({test: req});
});

// for empty date
app.get("/api/", (req, res, next) => {
  console.log("null date...");
  retDate = new Date();
  res.json({unix: retDate.getTime(), utc: retDate.toString()});
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
