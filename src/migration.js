var modulesReplacer = require('./modules-replacer');
var mapAsReplacer = require('./mapAs-replacer');
var interactivityStateReplacer = require('./interactivity-state-replacer');
var gridReplacer = require('./grid-replacer');
var enumsReplacer = require('./enums-replacer');
var deprecatedApiReplacer = require('./deprecated-api-replacer');

exports.migrate = function (code) {
    var argv = require('minimist')(process.argv.slice(2));

    code = {
        code: code
    };

    if (argv.t && argv.t.length) {
        if (~argv.t.indexOf('enums')) {
            code = enumsReplacer.init(code, wrapMark);
        }

        if (~argv.t.indexOf('modules')) {
            code = modulesReplacer.init(code, wrapMark);
        }

        if (~argv.t.indexOf('state')) {
            code = interactivityStateReplacer.init(code, wrapMark);
        }

        if (~argv.t.indexOf('api')) {
            code = deprecatedApiReplacer.init(code, wrapMark);
        }

        if (~argv.t.indexOf('grid')) {
            code = gridReplacer.init(code, wrapMark);
        }

        if (~argv.t.indexOf('mapping')) {
            code = mapAsReplacer.init(code, wrapMark);
        }

    } else {
        code = enumsReplacer.init(code, wrapMark);
        code = modulesReplacer.init(code, wrapMark);
        code = mapAsReplacer.init(code, wrapMark);
        code = deprecatedApiReplacer.init(code, wrapMark);
        code = gridReplacer.init(code, wrapMark);
        code = interactivityStateReplacer.init(code, wrapMark);
    }

    return code;

    function wrapMark(text) {
        var argv = require('minimist')(process.argv.slice(2));

        // if port exist, then web-server else cli
        if (argv.p) {
            return '<mark>' + text + '</mark>';
        } else {
            return text;
        }
    }
};
