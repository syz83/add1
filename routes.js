module.exports = function(app) {

var mongoose = require('mongoose'); //require mongoose

// Create a Rank schema
var rankSchema = mongoose.Schema({
    place: Number,
    name: String,
    highscore: Number
});

var Rank = mongoose.model('Rank', rankSchema, 'testData');

// routes ======================================================================

	// api ---------------------------------------------------------------------
	// get all ranks ordered by place
	app.get('/api/ranks', function(req, res) {

		// use mongoose to get all ranks in the database
		Rank.find({}, null, {sort: {place: 1}}, function(err, ranks) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err);

			res.json(ranks); // return all ranks in JSON format
		});
	});

	// get rank by place
    app.route('/api/ranks/:place')
    .get(function(req, res) {
        // use mongoose to get a rank in the database by place
        Rank.findOne({place: req.params.place}, function(err, rank) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.send(rank); // return the rank in JSON format
        });
    });


	// create rank and send back all ranks after creation
	app.post('/api/insert', function(req, res) {

		//update places of other ranks
		Rank.update({place:{$gte: req.body.place}}, {place: place+1});

		// create a rank, information comes from AJAX request from Angular
		Rank.create({
			place: req.body.place,
    		name: req.body.name,
    		highscore: req.body.highscore
		}, function(err, rank) {
			if (err)
				res.send(err);



			// get and return all the todos after you create another
			Rank.find(function(err, ranks) {
				if (err)
					res.send(err);
				res.json(ranks);
			});
		});

	});

	// delete a rank
	app.delete('/api/delete/:place', function(req, res) {
		Rank.remove({
			place : req.params.place
		}, function(err, rank) {
			if (err)
				res.send(err);

			// get and return all the ranks after you create another
			Rank.find(function(err, ranks) {
				if (err)
					res.send(err);
				res.json(ranks);
			});
		});
	});

	/* ========================= FRONT-END ROUTES ======================= */
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./app/index.html'); // load our public/index.html file
    });
};
