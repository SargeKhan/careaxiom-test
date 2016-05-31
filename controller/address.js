module.exports = function(app) {
  app.get("/I/want/title/", function(req, res){
    var address = req.query.address;
    res.status(200).send();
  });
};
