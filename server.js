// server.js
// where your node app starts

// init project

require('dotenv').config({path: __dirname + '/.env'});
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

//
app.get("/api",function(req, res){
 res.json({'unix': Date.now(), 'utc': Date()});
});
app.get("/api/:date_string", function(req, res){
  
  message ={}
  let date_string = req.params.date_string
  
  if(date_string.includes('-')||date_string.includes('/')||date_string.includes(',')||date_string.includes(' ')){
    /* Date String */
    message['unix'] = new Date(date_string).getTime()
    message['utc'] = new Date(date_string).toUTCString()
  }else{
    /* Timestamp */
    date_string = parseInt(date_string)
    
    message['unix'] = new Date(date_string).getTime()
    message['utc'] = new Date(date_string).toUTCString()
  }
  
  if(!message['unix'] || !message['utc']){
    res.json({error: 'Invalid Date'})
  }
  
  
  res.json(message);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
