var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../index.js");
var should = chai.should();
var cheerio = require("cheerio");
var request = require("request");

chai.use(chaiHttp);

describe("address", function(){
  this.timeout(15000);
  it("should return the title of google", function(done){
    chai.request(server)
    .get("/I/want/title/?address=http://google.com")
    .end(function(err, res){
      res.should.have.status(200);
      $ = cheerio.load(res.text);
      var li = $("li").text();
      var titleGoogle = li.indexOf("Google");
      titleGoogle.should.not.equal(-1);
      done();
    });
  });
  it("should return default render page without any title", function(done){
    chai.request(server)
    .get("/I/want/title/")
    .end(function(err, res){
      res.should.have.status(200);
      $ = cheerio.load(res.text);
      var li = $("li").text();
      li.should.equal("");
      done();
    });
  });
  it("should return title of google, facebook page", function(done){
    chai.request(server)
    .get("/I/want/title/?address=http://google.com&address=http://facebook.com")
    .end(function(err, res){
      res.should.have.status(200);
      $ = cheerio.load(res.text);
      $("li").each(function(i, elem){
        console.log(elem);
        var titleGoogle = elem.indexOf("Google");
        var titleFacebook = elem.indexOf("Google");
        var titleGorF = containsGoogle || containsFacebook;
        titleGorF.should.not.equal(false);
      });
      done();
    });
  });
});
