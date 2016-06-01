var express = require("express");
var exphbs  = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var port = process.env.PORT || 8080;

require("./controller/address.js")(app);

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app;
