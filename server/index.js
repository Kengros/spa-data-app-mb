var express = require('express');
var app = express();
var jwt = require('express-jwt');
var cors = require('cors');

app.use(cors());

var authCheck = jwt({
    secret: new Buffer('fzv9UClbnorHmkKuMcHhkNk71n5kstF_23WfutFm0rEG8y8NTYt-z8KZQogKUki3', 'base64'),
    audience: 'ztrdY1qKiZxSo7yXCdQPyHUKY9FlFas2'
});

app.get('/api/public', function(req, res) {
    res.json({ message: "Public Endpoint"});
});

app.get('/api/private', authCheck, function(req, res) {
    res.json({ message: "Private Endpoint"});
});

app.listen(3000);
console.log('Listening on http://localhost:3000');