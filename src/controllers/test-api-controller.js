const apiResponse = require("../util/api-response");
const log = require("../config/logger");

exports.apiFetch = [
	function (req, res) {
		try {
			//authenticate & logic to fetch data
			log.info('authenticate & logic to fetch data');
            return apiResponse.successResponseWithData(res,req.params.id,"Api Get Success");

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
			log.info('authenticate & logic to save data');
            return apiResponse.successResponseWithData(res,req.params.id,"Api Post Success");

		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];


exports.apiDelete = [
	function (req, res) {
		try {
			//authenticate & logic to delete data
			log.info('authenticate & logic to delete data');
            return apiResponse.successResponseWithData(res,req.params.id,"Deletion Success");

		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];