var express = require("express");
var bodyParser  = require("body-parser");

/* Config Express */
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

/* Send message handler */

function sendMessage(req, res){
	var exec    = require('child_process').exec;		
	var number  = req.query.number;
	var message = req.query.message;

	if (number == null || number == "") {
		res.send("Number is empty!");
		return false;
	}

	if (number.length < 11) {
		res.send("Number is incorrect. Must have be like this: 04120000000");
		return false;
	}

	operadora = number.substring(0, 4);
	if (operadora != "0414" && operadora != "0424" && operadora != "0412" && operadora != "0416" && operadora != "0426") {
		res.send("The phone dealer is incorrect");
		return false;
	} else if (number.substring(0,2) == "02") {
		res.send("The number cant be Landline");
		return false;
	}


	if (message == null || message == "") {
		res.send("Message is empty!");
		return false;
	}

	var cmd_pre  = "asterisk -rx 'gsm send sms 2 " + number + " ";
	var cmd_post = '"'+message+'"' + "'";
	var cmd = cmd_pre + cmd_post;

	exec(cmd, function(error, stdout, stderr) {
		console.log("Error: " + error);
		console.log("stdout: " + stdout);
		console.log("stderr: " + stderr);
		console.log(cmd);
	});
	res.send("Message send!");
}

/* Routers */
var router = express.Router();

router.get('/', function(req, res) {
   res.send("Welcome to SMS Gateway API");   
});

router.get('/sms', sendMessage);

app.use('/api', router);

app.listen(9000, function() {
	console.log("SMS Gateway running on http://10.10.2.200:9000");
});
