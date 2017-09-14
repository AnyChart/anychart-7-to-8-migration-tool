#!/usr/bin/env node

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var migration = require('./src/migration');
var program = require('commander');
var argv = require('minimist')(process.argv.slice(2));

program.option('-p, --port [value]', 'Server port', 3000)
    .parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
} else {
    init();
}

function init() {
    var app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, 'index.html'));
    });

    app.post('/migrate', function (req, res) {
        var optionMaps = {
            'bundle': '-b',
            'path': '-l'
        };

        if (req.body.hasOwnProperty('bundle')) {
            addProcessArgv('bundle');
        }

        if (req.body.hasOwnProperty('path')) {
            addProcessArgv('path');
        } else {
            removeProcessArgv('path');
        }

        var code = migration.migrate(req.body.code);

        // response
        res.send(code);

        function addProcessArgv(opt) {
            if (!~process.argv.indexOf(optionMaps[opt])) {
                process.argv.push(optionMaps[opt], req.body[opt]);
            } else {
                process.argv[process.argv.indexOf(optionMaps[opt]) + 1] = req.body[opt];
            }
        }

        function removeProcessArgv(opt) {
            var pos = process.argv.indexOf(optionMaps[opt]);

            if (~pos) {
                process.argv.splice(pos - 1, 2);
                console.log(process.argv);
            }
        }
    });

    app.listen(argv.p, function () {
        console.log('Start server on port: ' + argv.p);
    });
}
