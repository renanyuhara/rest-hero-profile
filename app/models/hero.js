//app/model/hero.js
var mongoose = require('mongoose');

var heroSchema = mongoose.Schema({
	name: String,
	user : { type: Schema.ObjectId, ref: 'userSchema'}
});

module.exports = mongoose.model('Hero', heroSchema);
