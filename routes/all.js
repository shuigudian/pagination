var express = require('express');
var fs = require("fs");

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  var contents = fs.readFileSync("public/sample.json");
  var jsonContent = JSON.parse(contents);
  var tableify = require('tableify');
  var html = tableify(jsonContent);
  res.send(html);
});

module.exports = router;
