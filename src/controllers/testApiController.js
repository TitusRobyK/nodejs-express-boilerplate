const apiResponse = require("../api-response/response");

exports.apiFetch = [
	function (req, res) {
		try {
            //authenticate & logic to fetch data
            console.log("Entered GET METHOD")
            return apiResponse.successResponse(res,req.params.id,"Get Method Success");

		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

exports.apiStore = [
	function (req, res) {
		try {
            //authenticate & logic to save data
            return apiResponse.successResponse(res,req.params.id,"Post Method Success");

		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];


exports.apiDelete = [
	function (req, res) {
		try {
            //authenticate & logic to delte data
            return apiResponse.successResponse(res,req.params.id,"Deletion Success");

		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];