var express = require("express");
var testApiRouter = require("./testApi.js");

var app = express();

app.use("/testApi/", testApiRouter);
module.exports = app;