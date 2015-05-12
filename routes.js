module.exports = function(app) {

var mongoose = require('mongoose'); //require mongoose

// Create a Rank schema
var rankSchema = mongoose.Schema({
    name: String,
    highscore: Number,
    average: Number
});

var Score = mongoose.model('Score', rankSchema, 'scores');
//var Average = mongoose.model('Average', rankSchema, 'averages');



// routes ======================================================================

	// api ---------------------------------------------------------------------
	// get all scores
	app.get('/api/scores', function(req, res) {

		// use mongoose to get all ranks in the database
		Score.find(function(err, scores) {
			//console.log("from routing: " + scores);
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err);

			res.json(scores); // return all todos in JSON format
		});
	});


	// create score and send back all scores after creation
	app.post('/api/scores', function(req, res) {

		// create a score, information comes from AJAX request from Angular
		//console.log("Really...?" + req.body);
		Score.create({
			name: req.body.name,
			highscore: req.body.highscore,
			average: req.body.average
		}, function(err, score) {
			if (err){
				res.send(err);
			}
			else{
				console.log(score);
				res.send(score);
			}
			// //get and return all the scores after you create another
			// Score.find(function(err, scores) {
			// 	if (err)
			// 		res.send(err);
			// 	res.json(scores);
			// });
		});

	});


	// delete a score
	app.delete('/api/scores/:_id', function(req, res) {
		Score.remove({
			_id : req.params._id
		}, function(err, score) {
			if (err)
				res.send(err);
			else{
				console.log("Deleted: " + score);
				res.send(score);
			}
		});
	});
};
