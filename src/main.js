const express = require('express');
const path = require('path');
const app = express();
var apiRouter = require("./routes/api");
var apiResponse = require("./api-response/response");

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log(`Server started on port ${PORT}`));


app.use("/api/", apiRouter);
app.use((err, req, res) => {
	if(err.name == "UnauthorizedError"){
		return apiResponse.unauthorizedResponse(res, err.message);
	}
});
module.exports = app;