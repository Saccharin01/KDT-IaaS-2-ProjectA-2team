const express = require('express');
const searctrt = require("./routers/searchrt.js");
const MongoDB = require('./modules/MongoDB/mongoDB.js');
const app = express();
const cors = require('cors');

app.use(cors());
app.use("/search", searctrt);

module.exports = app;