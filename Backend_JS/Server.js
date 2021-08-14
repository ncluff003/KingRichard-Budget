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
const mongoose = require(`mongoose`);
const reload = require('reload');

// Third Party Configuration Files
dotenv.config({
  path: `./config.env`,
});

console.log(process.env.DB);
const DB = process.env.DB.replace(`<PASSWORD>`, process.env.DBPASSWORD).replace(`<DATABASE>`, process.env.DBNAME);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`DB Connection Successful`));

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
