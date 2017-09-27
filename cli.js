#!/usr/bin/env node

var program = require('commander');
var beautify = require('js-beautify').js_beautify;
var fs = require('fs');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var migration = require('./src/migration');

program
    .arguments('<path>')
    .description('Argument <path> or <file> is required.\n  Specify the path to the files that you want to change')
    .option('-r, --recursive [value]', 'recursive or not')
    .option('-e, --extensions [items]', 'list of allowed extension', ['html'])
    .option('-l, --path [value]', 'local path to js modules or CDN path')
    .option('-v, --version [value]', 'anyChart version')
    .option('-b, --bundle [value]', 'anychart-bundle or anychart-base + modules')
    .option('-t, --replacer [value]', '')
    .option('-f, --modules [value]', 'force add modules, anychart-exports and anychart-ui')
    .parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
} else {
    init();
}

function init() {
    var log = {
        'affected-files': [],
        'enums-warning': [],
        'grid-warning': [],
        'state-warning': []
    };

    var files = getFiles(argv._[0], argv.r);
    var extensions = argv.e ? argv.e.split(',') : ['html'];
    extensions = extensions.map(function (item) {
        return '.' + item + '$'
    }).join('|');

    for (var i = 0; i < files.length; i++) {
        var reg = new RegExp(extensions);
        var j;

        if (reg.test(files[i])) {
            var data = fs.readFileSync(files[i], 'utf8');

            data = migration.migrate(data);

            fs.writeFileSync(files[i], data.code, 'utf8');

            files[i] = files[i].replace(/\/\//g, '/');

            log['affected-files'].push(files[i]);

            if (data['enums-warning']) {
                for (j = 0; j < data['enums-warning'].length; j++) {
                    log['enums-warning'] = log['enums-warning'].concat({
                        method: data['enums-warning'][j].method,
                        old: data['enums-warning'][j].old,
                        new: data['enums-warning'][j].new,
                        line: data['enums-warning'][j].line,
                        path: files[i]
                    });
                }
            }

            if (data['grid-warning']) {
                for (j = 0; j < data['grid-warning'].length; j++) {
                    if (!data['grid-warning'][j].exceptions) {
                        log['grid-warning'] = log['grid-warning'].concat({
                            old: data['grid-warning'][j].old,
                            new: data['grid-warning'][j].new,
                            line: data['grid-warning'][j].line,
                            path: files[i]
                        });
                    } else {
                        log['grid-warning'] = log['grid-warning'].concat({
                            exceptions: data['grid-warning'][j].exceptions,
                            path: files[i]
                        });
                    }
                }
            }

            if (data['state-warning']) {
                for (j = 0; j < data['state-warning'].length; j++) {
                    log['state-warning'] = log['state-warning'].concat({
                        old: data['state-warning'][j].old,
                        new: data['state-warning'][j].new,
                        line: data['state-warning'][j].line,
                        path: files[i]
                    });
                }
            }
        }
    }

    // clear log
    for (key in log) {
        if (!log[key].length) {
            delete log[key]
        }
    }

    createLog(log);
}

function getFiles(path, isRecursive, files_) {
    files_ = files_ || [];

    if (!fs.statSync(path).isDirectory()) {
        files_.push(path);
        return files_;
    }

    var files = fs.readdirSync(path);

    for (var i in files) {
        var name = path + '/' + files[i];

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
        fs.unlink(path.resolve('./') + '\/migration.log.json');
    }
}