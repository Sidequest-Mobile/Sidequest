import app from '../firebaseConfig.js';

var auth = app.auth()
var database = app.database();

export default { auth, database };
