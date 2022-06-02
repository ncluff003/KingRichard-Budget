////////////////////////////////////////////
//  Core Modules

////////////////////////////////////////////
//  Third Party Modules
const express = require('express');
const path = require('path');
// const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookierParser = require('cookie-parser');
const compression = require('compression');

////////////////////////////////////////////
//  My Modules
const AppError = require('./Utilities/appError');
const errorController = require('./Controllers/errorController');

////////////////////////////////////////////
//  Third Party Module Instances
const App = express();

////////////////////////////////////////////
//  Third Party Middleware

////////////////////////////////////////////
//  Third Party Config Files
App.set(`view engine`, `pug`);
App.set(`views`, path.join(__dirname, `Views`));
// App.use(helmet());
App.use(express.static(path.resolve(`${__dirname}/../`, `Public/`)));
App.use(express.urlencoded({ extended: true, limit: '50kb' }));
App.use(express.json());
App.use(cookierParser());
App.use(xss());
App.use(hpp());
App.use(compression());

////////////////////////////////////////////
//  My Middleware
App.use((request, response, next) => {
  next();
});

////////////////////////////////////////////
//  Routers
const appRouter = require(`./Routes/appRoutes`);

////////////////////////////////////////////
//  Routing Middleware
App.use(`/App`, appRouter);

////////////////////////////////////////////
//  Exported Controllers

////////////////////////////////////////////
//  App Global Error Handling Middleware

App.all(`*`, (request, response, next) => {
  // response.status(404).json({
  //   status: `Failed`,
  //   message: `Failed to find ${request.originalUrl} on this server!`,
  // });
  // let error = new Error(`Failed to find ${request.originalUrl} on this server!`);
  // error.status = `Failed`;
  // error.statusCode = 404;
  next(new AppError(`Failed to find ${request.originalUrl} on this server!`, 404));
});

App.use(errorController.GlobalErrorHandler);

////////////////////////////////////////////
//  Exporting App
module.exports = App;
