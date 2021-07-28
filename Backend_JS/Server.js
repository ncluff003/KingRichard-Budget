////////////////////////////////////////////
//  Core Modules
const fs = require('fs');
const http = require('http');
const url = require('url');

////////////////////////////////////////////
//  Third Party Modules
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const reload = require('reload');

////////////////////////////////////////////
//  Middleware

////////////////////////////////////////////
//  My Modules
const App = require('./App');

////////////////////////////////////////////
//  Initialize Port Number
const PORT = 2222;

////////////////////////////////////////////
//  Start Server
App.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

reload(App);
