var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../index.js");
var should = chai.should();

chai.use(chaiHttp);

describe("address", function(){
  it("should return the title of google", function(done){
    chai.request(server)
    .get("/I/want/title/?address=google.com")
    .end(function(err, res){
      res.should.have.status(200);
    });
  });
  it("should return default render page without title", function(done){
    chai.request(server)
    .get("/I/want/title/?address=google.com")
    .end(function(err, res){
      res.should.have.status(200);
    });
  });
  it("should return title of google, facebook page", function(done){
    chai.request(server)
    .get("/I/want/title/?address=google.com")
    .end(function(err, res){
      res.should.have.status(200);
    });
  });
});
