var express = require('express');
var app = express();
var fs = require("fs");
var url = require('url');

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "dictionary"
});


app.use(express.static('public'));

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})


app.get('/entotr', function (req, res) {
    console.log(req.url);
	q=url.parse(req.url,true).query;
	console.log(q);
    con.query("SELECT * FROM enwords where english=?",[q.w], function (err, result, fields) {
    if (err) throw err;
		console.log(result);
		res.json(result);
		res.end();
    });
})

app.get('/indexx.html', function (req, res) {
   res.sendFile( __dirname + "/" + "indexx.html" );
})

app.get('/trtoen', function (req, res) {
    console.log(req.url);
	q=url.parse(req.url,true).query;
	console.log(q);
    con.query("SELECT * FROM trwords where turkish=?",[q.w], function (err, result, fields) {
    if (err) throw err;
		console.log(result);
		res.json(result);
		res.end();
    });
})

app.get('/newen.html', function (req, res) {
   res.sendFile( __dirname + "/" + "newen.html" );
})

app.get('/addnewenword', function (req, res) {
q = url.parse(req.url, true).query;
console.log(q);
	con.query("Insert INTO enwords(english,turkish,example) values (?,?,?)",[q.english,q.turkish,q.example], function (err, result, fields) {
		if (err) throw err;
		res.sendFile( __dirname + "/" + "newen.html" );
		console.log("1 en record added");
	});
})

app.get('/newtr.html', function (req, res) {
   res.sendFile( __dirname + "/" + "newtr.html" );
})

app.get('/addnewtrword', function (req, res) {
q = url.parse(req.url, true).query;
console.log(q);
	con.query("Insert INTO trwords(turkish,english,example) values (?,?,?)",[q.turkish,q.english,q.example], function (err, result, fields) {
		if (err) throw err;
		res.sendFile( __dirname + "/" + "newtr.html" );
		console.log("1 tr record added");
	});
})


app.get('/delen.html', function (req, res) {
   res.sendFile( __dirname + "/" + "delen.html" );
})

app.get('/delenword', function (req, res) {
q = url.parse(req.url, true).query;
console.log(q);
	con.query("SELECT * FROM enwords where english=?",[q.w], function (err, result, fields) {
		if (err) throw err;
		res.json(result);
		res.end();
		con.query("DELETE FROM enwords where english=?", [q.w], function (err, result, fields) {
			if (err) throw err;
			console.log("1 en record deleted");
		});
	});
})


app.get('/deltr.html', function (req, res) {
   res.sendFile( __dirname + "/" + "deltr.html" );
})

app.get('/deltrword', function (req, res) {
q = url.parse(req.url, true).query;
console.log(q);
	con.query("SELECT * FROM trwords where turkish=?",[q.w], function (err, result, fields) {
		if (err) throw err;
		res.json(result);
		res.end();
		con.query("DELETE FROM trwords where turkish=?", [q.w], function (err, result, fields) {
			if (err) throw err;
			console.log("1 tr record deleted");
		});
	});
})


var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Dictionary app listening at http://%s:%s", host, port)
})