
var express = require('express');
var app = express();
var fs = require("fs");
var url = require('url');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var q;


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "forum"
});


app.use(express.static('public'));

app.use(bodyParser.json());


app.get('/homepage.html', function (req, res) {
   res.sendFile( __dirname + "/" + "homepage.html" );
})
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "homepage.html" );
})

app.get('/login', function (req, res) {
   res.sendFile( __dirname + "/" + "login.html" );
})
app.get('/register', function (req, res) {
   res.sendFile( __dirname + "/" + "register.html" );
})

app.get('/loginuser', function (req, res) {
q = url.parse(req.url, true).query;
console.log(q);
	con.query("SELECT name,username,password FROM users where username=? and password=?",[q.username,q.password], function (err, result, fields) {
		if (err) throw err;
		if(result.length==0){
			res.sendFile( __dirname + "/" + "login.html" );
		}
		else
			res.sendFile( __dirname + "/" + "profile.html" );
	});
})

app.get('/registeruser', function (req, res) {
q = url.parse(req.url, true).query;
console.log(q);
	con.query("Insert INTO users(name,username,password) values (?,?,?)",[q.name,q.username,q.password], function (err, result, fields) {
		if (err) throw err;
		if(result.length==0){
			res.sendFile( __dirname + "/" + "register.html" );
		}
		else
			res.sendFile( __dirname + "/" + "profile.html" );
	});
})


app.get('/profile', function (req, res) {
	con.query("SELECT username, comment, date FROM userposts ", function(err, result, fields){
		if (err) throw err;
		res.json(result);
		res.end();
		console.log(q.username+" profile");
    });
})





app.post('/insert', function (req, res) {
	var qp = req.body;
	qp.username = q.username;
	con.query("INSERT INTO userposts(username, comment) VALUES (?,?)", [qp.username, qp.message], function(err, result, fields){
		if (err) throw err;
		res.json(result);
		res.end();
		console.log(qp.username+" insert");
    });
})



con.connect(function(err) {
  if (err) throw err;
  console.log("Connected To MySQL");
});


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})