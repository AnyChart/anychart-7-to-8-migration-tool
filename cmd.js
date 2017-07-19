var program = require('commander');
var beautify = require('js-beautify').js_beautify;
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));
var migration = require('./src/migration');

program
    .option('-p, --path [value]', 'Path', '.')
    .option('-r, --recursive [value]', 'recursive or not', false)
    .option('-e, --extensions [items]', 'List of allowed extension', ['html']);

// init
init();

function init() {
    var log = {
        changed: [],
        conflict: []
    };

    var files = getFiles(argv.p, argv.r);
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
                log.changed.push(files[i]);
            }

            if (data.conflict) {
                for (var j = 0; j < data.conflict.length; j++) {
                    log.conflict = log.conflict.concat({
                        method: data.conflict[j].method,
                        value: data.conflict[j].value,
                        path: files[i]
                    });
                }
            }
        }
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
    if (log.changed.length || log.conflict.length) {
        if (fs.existsSync('log.txt')) {
            fs.writeFileSync('log.txt', beautify(JSON.stringify(log), {wrap_line_length: 100}));
        } else {
            fs.appendFile('log.txt', beautify(JSON.stringify(log), {wrap_line_length: 100}));
        }
    } else {
        fs.unlink('log.txt');
    }
}
