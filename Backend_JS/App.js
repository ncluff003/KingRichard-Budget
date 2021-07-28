////////////////////////////////////////////
//  Core Modules
const fs = require('fs');
const http = require('http');
const url = require('url');

////////////////////////////////////////////
//  Third Party Modules
const express = require('express');
const path = require(`path`);
const dotenv = require('dotenv');

////////////////////////////////////////////
//  Middleware

////////////////////////////////////////////
//  My Modules

const App = express();

App.use(express.static(path.join(__dirname, '../Public')));

// Eventually, I will make this so that if the query string is both the root '/', or a hash symol after a forward slash '/#', the index.html page will be returned.
App.get('/', (request, response) => {
  return response.sendFile(`${__dirname}/../Public/DIST/index.html`);
});

module.exports = App;
