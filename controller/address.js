var request = require("request");
var cheerio = require("cheerio");
var _ = require("underscore");
var async = require("async");

var totalRequests = 0;
var requestsCompleted = 0;
var resultArray = [];
 

function getAddressArray(addresses) {
  var siteList = [];
  if( typeof addresses == "string" ) {
    siteList.push(addresses);
  } else if( typeof addresses == "object") {
    siteList = addresses
  } else if( typeof addresses == "undefined") {
    siteList = undefined;
  }
  return siteList;
};

function fetchTitle(url, respondCallback){
  request(url, function(error, response, html){
    requestsCompleted++;
    if(!error){
      var $ = cheerio.load(html);
      var resultElement ={
        url:url,
        title: $("title").text()
      };
      respondCallback(null, resultElement);
    } else {
      var resultElement = {
        url: url,
        title:"unable to fetch title from resource"};
      respondCallback(null, resultElement);
    }
  });
}

module.exports = function(app) {
  app.get("/I/want/title/", function(req, res){
    var addresses = getAddressArray(req.query.address);
    totalRequests = addresses.length;
    requestsCompleted = 0;

    console.log("Addresses: ", addresses);
    async.map(addresses, fetchTitle, function(error, result){
        return res.render("index", {
          result: result
        });
      });
  });

  app.get("*", function(req, res){
    res.status(404).send("Error: Unknown Path");
  });
};
