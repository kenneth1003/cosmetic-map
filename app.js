var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/* ' }));
app.use(express.static('public'));


app.use('/', function(req, res){
	var ua = req.headers['user-agent']
	if (/mobile/i.test(ua)){
    	res.sendFile(path.join(__dirname+'/public/mobile.html'));
	}else{
		res.sendFile(path.join(__dirname+'/public/desktop.html'));
	}
})


var server = http.createServer(app);

server.listen(3000);

console.log('server is listening on port 3000');