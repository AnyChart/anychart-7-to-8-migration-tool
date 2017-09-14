var modulesReplacer = require('./modules-replacer');
var mapAsReplacer = require('./mapAs-replacer');
var interactivityStateReplacer = require('./interactivity-state-replacer');
var gridReplacer = require('./grid-replacer');
var enumsReplacer = require('./enums-replacer');

exports.migrate = function (code) {
    code = {
        code: code
    };

    code = enumsReplacer.init(code, wrapMark);
    // code = modulesReplacer.init(code, wrapMark);
    // code = mapAsReplacer.init(code, wrapMark);
    // code = gridReplacer.init(code);
    // code = interactivityStateReplacer.init(code, wrapMark);

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