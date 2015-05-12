var express = require("express");
var logfmt = require("logfmt");
var path = require("path");
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

/* ================= REGISTER MODULES ===================== */

app.use(logfmt.requestLogger());
	
app.use(express.static(path.join(__dirname, 'app')));

app.use(bodyParser.json());

/* ================= Connect to mongo database =============== */
mongoose.connect('mongodb://add1:add1password123@ds061751.mongolab.com:61751/add1');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Connected to mongodb");
});

/* ======================== ROUTES ========================= */

require('./routes.js')(app);                            		        // configure our routes, passing in app reference

/* =============== START APP (THIS GOES LAST) ============== */

var port = Number(process.env.PORT || 5000);							// start app
app.listen(port, function() {
  console.log("Listening on " + port);									// shout out to user
});
exports = module.exports = app;                                         // expose app