var express = require("express");
var testApiRouter = require("../services/test-api-service.js");

var app = express();

app.use("/test-api-service/", testApiRouter);
module.exports = app;