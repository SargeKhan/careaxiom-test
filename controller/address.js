var request = require("request");
var cheerio = require("cheerio");
var _ = require("underscore");

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
      resultArray.push({
        url:url,
        title: $("title").text()
      });
    } else {
      resultArray.push({
        url: url,
        title:"unable to fetch title from resource"});
    }
    if(requestsCompleted >= totalRequests) { 
      respondCallback();
    };

  });
}

module.exports = function(app) {
  app.get("/I/want/title/", function(req, res){
    var addresses = getAddressArray(req.query.address);
    totalRequests = addresses.length;
    requestsCompleted = 0;

    console.log("Addresses: ", addresses);
    titleArray = [];
    for(address in addresses){
      fetchTitle(addresses[address], function(){
        console.log("Title Array: ", resultArray);
        return res.render("index", {
          result: resultArray
        });
      });
    }
  });

  app.get("*", function(req, res){
    res.status(404).send("Error: Unknown Path");
  });
};
