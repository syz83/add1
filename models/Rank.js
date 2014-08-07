// Require mongoose dependency
var mongoose = require('mongoose');

// Create a Rank schema
var rankSchema = mongoose.Schema({
    place: Number,
    name: String,
    highscore: Number,
});

// Register the Product model and schema with mongoose
mongoose.model('Rank', rankSchema);