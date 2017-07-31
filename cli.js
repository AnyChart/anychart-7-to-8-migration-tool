#!/usr/bin/env node

var program = require('commander');
var beautify = require('js-beautify').js_beautify;
var fs = require('fs');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var migration = require('./src/migration');

program
    .option('-r, --recursive [value]', 'recursive or not', false)
    .option('-e, --extensions [items]', 'list of allowed extension', ['html'])
    .option('-p, --path [value]', 'local path to js modules or CDN path', false)
    .parse(process.argv);

program.on('--help', function(){
    console.log('\n    Argument is required! Specify the path to the files that you want to change.    Example - anychart-7-to-8-migration-tool-cli C:/my-samples/');
});

if (!process.argv.slice(2).length) {
    program.outputHelp();
} else {
    init();
}

function init() {
    var log = {
        'affected-files': [],
        'conflicts': []
    };

    var files = getFiles(argv._[0], argv.r);
    var extensions = argv.e ? argv.e.split(',') : ['html'];
    extensions = extensions.map(function (item) {
        return '.' + item + '$'
    }).join('|');

    for (var i = 0; i < files.length; i++) {
        var reg = new RegExp(extensions);

        if (reg.test(files[i])) {
            var data = fs.readFileSync(files[i], 'utf8');

            data = migration.migrate(data);

            if (data.code) {
                fs.writeFileSync(files[i], data.code, 'utf8');
            } else {
                fs.writeFileSync(files[i], data, 'utf8');
            }

            log['affected-files'].push(files[i]);

            if (data.conflict) {
                for (var j = 0; j < data.conflict.length; j++) {
                    log.conflicts = log.conflicts.concat({
                        method: data.conflict[j].method,
                        value: data.conflict[j].value,
                        path: files[i]
                    });
                }
            }
        }
    }

    if (!log.conflicts.length) {
        delete log.conflicts
    }

    createLog(log);
}

function getFiles(dir, isRecursive, files_) {
    files_ = files_ || [];
    var files = fs.readdirSync(dir);

    for (var i in files) {
        var name = dir + '/' + files[i];

        if (fs.statSync(name).isDirectory() && isRecursive) {
            getFiles(name, isRecursive, files_);
        } else if (!fs.statSync(name).isDirectory()) {
            files_.push(name);
        }
    }
    return files_;
}

function createLog(log) {
    if (log['affected-files'].length) {
        if (fs.existsSync('migration.log.json')) {
            fs.writeFileSync('migration.log.json', beautify(JSON.stringify(log), {wrap_line_length: 100}));
        } else {
            fs.appendFile('migration.log.json', beautify(JSON.stringify(log), {wrap_line_length: 100}));
        }

        console.log('See log file: ' + path.resolve('./') + '\\migration.log.json');
    } else {
        fs.unlink(path.resolve('./') + '\\migration.log.json');
    }
}