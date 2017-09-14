#!/usr/bin/env node

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var migration = require('./src/migration');
var program = require('commander');
var argv = require('minimist')(process.argv.slice(2));
var optionsMap = require('./src/options-map').options;

program.option(optionsMap.port + ', --port [value]', 'Server port', 3000)
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
        for (option in optionsMap) {
            if (optionsMap.hasOwnProperty(option)) {
                if (req.body.hasOwnProperty(option)) {
                    addProcessArgv(option);
                } else if (option === 'path') {
                    removeProcessArgv(option);
                }
            }
        }

        var code = migration.migrate(req.body.code);

        // response
        res.send(code);

        function addProcessArgv(opt) {
            if (!~process.argv.indexOf(optionsMap[opt])) {
                process.argv.push(optionsMap[opt], req.body[opt]);
            } else {
                process.argv[process.argv.indexOf(optionsMap[opt]) + 1] = req.body[opt];
            }
        }

        function removeProcessArgv(opt) {
            var pos = process.argv.indexOf(optionsMap[opt]);

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
