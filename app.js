const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const os = require('os');
const server = express();
const port = 3000;
var logged_in = false;
var current_user;
var current_user_json;

server.use(express.static('public'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

// Page routing
server.get('/', function(req, res){
    if(logged_in){
      console.log("Request recieved: user logged in sending home_logged_in.html")
      res.sendFile('home_logged_in.html', {root: path.join(__dirname, '/public')})
    } else {
      console.log("Request recieved: sending home.html")
      res.sendFile('home.html', {root: path.join(__dirname, '/public')})
    }
  })

server.get('/register', (req, res) => {
    console.log("Request recieved: sending register.html")
    res.sendFile('register.html', {root: path.join(__dirname, '/public')})
  })

server.get('/login', (req, res) => {
    console.log("Request recieved: sending login.html")
    res.sendFile('login.html', {root: path.join(__dirname, '/public')})
  })

  server.get('/discussion', (req, res) => {
    if(logged_in){
      console.log("Request recieved: user logged in sending discussion_logged_in.html")
      res.sendFile('discussion_logged_in.html', {root: path.join(__dirname, '/public')})
    } else {
      console.log("Request recieved: sending discussion.html")
      res.sendFile('discussion.html', {root: path.join(__dirname, '/public')})
    }
  })

server.get('/map', (req, res) => {
    if(logged_in){
      console.log("Request recieved: user logged in sending map_logged_in.html")
      res.sendFile('map_logged_in.html', {root: path.join(__dirname, '/public')})
    } else {
      console.log("Request recieved: sending map.html")
      res.sendFile('map.html', {root: path.join(__dirname, '/public')})
    }
  })
  
server.get('/statistics', (req, res) => {
    if(logged_in){
      console.log("Request recieved: user logged in sending statistics_logged_in.html")
      res.sendFile('statistics_logged_in.html', {root: path.join(__dirname, '/public')})
    } else {
      console.log("Request recieved: sending statistics.html")
      res.sendFile('statistics.html', {root: path.join(__dirname, '/public')})
    }
  })

// Load logins.JSON
let rawdata = fs.readFileSync('accounts.json');
var accounts_json = JSON.parse(rawdata);
console.log("accounts.JSON loaded");

// Send account data to frontend
server.get('/accounts/json', (req, res) => {
    res.json(accounts_json)
  })

// Logout
server.get("/logout", (req, res) => {
    logged_in = false;
    console.log("Request recieved: logging user out and sending login.html")
    res.sendFile('login.html', {root: path.join(__dirname, '/public')})
  })

// Signup form handling
server.post('/get_register_form', function(req, res) {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    var new_user_data = {
      username: username,
      email: email,
      password: password,
    }
  
    let duplicate_username = false;
  
    for(var i = 0; i < accounts_json.users.length; i++){
      if(username.toLowerCase() == accounts_json.users[i].username.toLowerCase()){
        duplicate_username = true;
      }
    }
  
    if(duplicate_username){
      console.log("Sorry, that username is taken please try again");
      return;
    } else{
      accounts_json.users.push(new_user_data);
  
      // Write JSON to logins.json
      fs.writeFile("accounts.json", JSON.stringify(accounts_json), "utf8", function(err) {
        if (err) throw err;
        console.log("JSON file has been saved");
      })
  
      res.redirect("/login");
    }
  });

// Login form handling
server.post('/get_login_form', function(req, res){
    let username = req.body.username;
    let password = req.body.password;
    current_user = username;
  
    for(var i = 0; i < accounts_json.users.length; i++){
      if(username.toLowerCase() == accounts_json.users[i].username.toLowerCase() && password == accounts_json.users[i].password){
        console.log("user " + accounts_json.users[i].username + " has logged in");
        current_user_json = accounts_json.users[i];
        logged_in = true;
        res.redirect("/");
        return;
      }
    }
  
    console.log("invalid username/password")
    res.redirect("/login");
  });
  
// This line needs to come at the end of server side code or the code under will break
server.listen(port, () => console.log('listening'));