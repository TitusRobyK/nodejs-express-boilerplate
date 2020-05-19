  
var express = require("express");
const testApiController = require("../controllers/testApiController");

var router = express.Router();

router.get("/:id", testApiController.apiFetch);
router.post("/", testApiController.apiStore);
router.delete("/:id", testApiController.apiDelete);

module.exports = router;