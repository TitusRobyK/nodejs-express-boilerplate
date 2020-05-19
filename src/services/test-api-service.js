  
var express = require("express");
const testApiController = require("../controllers/test-api-controller");

var router = express.Router();

router.get("/:id", testApiController.apiFetch);
router.post("/", testApiController.apiStore);
router.delete("/:id", testApiController.apiDelete);

module.exports = router;