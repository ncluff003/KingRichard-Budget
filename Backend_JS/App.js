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
App.use(express.urlencoded({ extended: true, limit: '25kb' }));
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
const userRouter = require('./Routes/userRoutes');

////////////////////////////////////////////
//  Routing Middleware
App.use(`/`, appRouter);
App.use(`/users`, userRouter);

////////////////////////////////////////////
//  My Modules

////////////////////////////////////////////
//  Exported Controllers

////////////////////////////////////////////
//  App Global Error Handling Middleware

App.all(`*`, (request, response, next) => {
  response.status(404).json({
    status: `Failed`,
    message: `Failed to find ${request.originalUrl}`,
  });
  next();
});

////////////////////////////////////////////
//  Exporting App
module.exports = App;
