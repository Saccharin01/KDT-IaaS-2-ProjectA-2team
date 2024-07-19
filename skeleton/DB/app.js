const express = require('express');
const searctrt = require("./routers/searchrt.js");
const MongoDB = require('./modules/MongoDB/mongoDB.js');
const app = express();

app.use("/search", searctrt);

module.exports = app;