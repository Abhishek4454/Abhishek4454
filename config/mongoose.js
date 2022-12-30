const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/codeil_development');
const db = mongoose.connection;

db.on('Error', console.error.bind(console, 'Error connecting mongoDB'));


db.once('open', function () {
	console.log('Conected to database : : MongoDB');
});

module.exports = db;