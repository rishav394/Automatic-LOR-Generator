const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var mySchema = new Schema({
	username: String,
	password: String,
});

const UserModel = mongoose.model('user', mySchema);

module.exports = UserModel;
