const express = require('express');
const path = require('path');
const app = express();
var apiRouter = require("./routes/api-router");
var apiResponse = require("./api-response/response");
const log = require('./config/logger');

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => log.info(`Server started on port ${PORT}`));

app.use("/api/", apiRouter);

app.all("*", function(req, res) {
	return apiResponse.notFoundResponse(res, "API not found");
});

app.use((err, req, res) => {
	if(err.name == "UnauthorizedError"){
		return apiResponse.unauthorizedResponse(res, err.message);
	}
});

module.exports = app;