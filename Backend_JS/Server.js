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

////////////////////////////////////////////
//  Uncaught Exception Handler
process.on(`uncaughtException`, (error) => {
  console.log(error.name, error.message);
  console.log(`UNHANDLED EXCEPTION 💥 -- Shutting Down...`);
  server.close(() => {
    process.exit(1);
  });
});

// Third Party Configuration Files
dotenv.config({
  path: `./config.env`,
});

const DB = process.env.DB.replace(`<PASSWORD>`, process.env.DBPASSWORD).replace(`<DATABASE>`, process.env.DBNAME);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
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
const server = App.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

reload(App);

// This is how to handle a more graceful shutdown.
process.on(`unhandledRejection`, (error) => {
  console.log(error.name, error.message);
  console.log(`UNHANDLED REJECTION 💥 -- Shutting Down...`);
  server.close(() => {
    process.exit(1);
  });
});
