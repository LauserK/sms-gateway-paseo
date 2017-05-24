var express = require("express");
var bodyParser  = require("body-parser");

/* Config Express */
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

/* Send message handler */

function sendMessage(req, res){
	var exec    = require('child_process').exec;		
	var number  = req.query.num;
	var message = req.query.message;
	var cmd     = 'asterisk -rx "gsm send sms 2 ' + number + ' "' + message + '""';

	exec(cmd, function(error, stdout, stderr) {
		console.log("Error: " + error);
		console.log("stdout: " + stdout);
		console.log("stderr: " + stderr);
	});
	res.send("Mensaje enviado!");
}

/* Routers */
var router = express.Router();

router.get('/', function(req, res) {
   res.send("Welcome to SMS Gateway API");   
});

router.get('/sms', sendMessage);

app.use('/api/v1', router);

app.listen(9000, function() {
	console.log("SMS Gateway running on http://10.10.2.200:9000");
});
