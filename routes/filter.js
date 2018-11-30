var express = require('express');
var fs = require("fs");

var router = express.Router();
var recordPerPage = 10;

function compare(a, b, query, i) {
  var keys = Object.keys(query);
  if (query[keys[i]] == 'asc') {
    return a[keys[i]] < b[keys[i]];
  } else {
    return b[keys[i]] < a[keys[i]];
  }
}

/* GET users listing. */
router.get('/', function (req, res, next) {
  var query = req.query;
  var contents = fs.readFileSync("public/sample.json");
  var jsonContent = JSON.parse(contents);

  var page = parseInt(query.page);
  var size = parseInt(query.size);

  delete query.page;
  delete query.size;

  var len = Object.keys(query).length;
  var keys = Object.keys(query);

  if (len > 0) {
    jsonContent.sort(function (a, b) {
      if (len == 1) {
        return compare(a, b, query, 0);
      } else if (len == 2) {
        if (a[keys[0]] == b[keys[0]]) {
          return compare(a, b, query, 1);
        } else {
          return compare(a, b, query, 0);
        }
      } else if (len == 3) {
        if (a[keys[0]] == b[keys[0]]) {
          if (a[keys[1]] == b[keys[1]]) {
            return compare(a, b, query, 2);
          } else {
            return compare(a, b, query, 1);
          }
        } else {
          return compare(a, b, query, 0);
        }
      }
    });
  }

  var total = jsonContent.length;
  var begin = page * size;
  var end = (page + 1) * size;

  begin = Math.min(begin, total - 1);
  end = Math.min(end, total);

  jsonContent = jsonContent.slice(begin, end);

  var tableify = require('tableify');
  var html = tableify(jsonContent);
  res.send(html);
});

module.exports = router;