var modulesReplacer = require('./modules-replacer');
var mapAsReplacer = require('./mapAs-replacer');
var interactivityStateReplacer = require('./interactivity-state-replacer');
var gridReplacer = require('./grid-replacer');
var enumsReplacer = require('./enums-replacer');

exports.migrate = function(code) {
    code = {
        code: code
    };

    code = enumsReplacer.init(code);
    code = modulesReplacer.init(code);
    code = mapAsReplacer.init(code);
    code = gridReplacer.init(code);
    code = interactivityStateReplacer.init(code);

    return code;
};