var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var migration = require('./src/migration');
var program = require('commander');
var argv = require('minimist')(process.argv.slice(2));

program.option('-p, --port [value]', 'Server port', 3000);

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/migrate', function (req, res) {
    var code = req.body.code;
    code = migration.migrate(code);
    res.send(code);
});


app.listen(argv.p, function () {
    console.log('Start server on port: ' + argv.p);
});