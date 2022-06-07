const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const os = require('os');
const server = express();
const port = 3000;

// Page routing
server.get('/', function(req, res){
    console.log("Request recieved: user not logged in, sending home.html")
    res.sendFile('home.html', {root: path.join(__dirname, '/public')})
  })
  
// This line needs to come at the end of server side code or the code under will break
server.listen(port, () => console.log('listening'));