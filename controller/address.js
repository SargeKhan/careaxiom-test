var request = require("request");
var cheerio = require("cheerio");
var _ = require("underscore");
var Promise = require("bluebird");

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

function fetchTitle(url){
  return new Promise(function(resolve, reject){
    request(url, function(error, response, html){
      requestsCompleted++;
      if(!error){
        var $ = cheerio.load(html);
        var resultElement ={
          url:url,
          title: $("title").text()
        };
        resolve(resultElement);
      } else {
        var resultElement = {
          url: url,
          title:"unable to fetch title from resource"
        };
        resolve(resultElement);
      }
    });
  });
}

module.exports = function(app) {
  app.get("/I/want/title/", function(req, res){
    var addresses = getAddressArray(req.query.address);
    if(addresses != null){
      totalRequests = addresses.length;
      requestsCompleted = 0;

      console.log("Addresses: ", addresses);
      var titlePromises = _.map(addresses, function(address){
        return fetchTitle(address);
      });
      Promise.all(titlePromises)
      .then(function(result){
        return res.render("index", {
          result: result
        });
      })
    }else{
      return res.render("index");
    }
  });

  app.get("*", function(req, res){
    res.status(404).send("Error: Unknown Path");
  });
};
