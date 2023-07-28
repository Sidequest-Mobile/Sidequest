import app from '../firebaseConfig.js';

var auth = app.auth()
var database = app.database();

module.exports.auth = auth;
module.exports.database = database;

