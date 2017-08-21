var modulesReplacer = require('./modules-replacer');
var enumsReplacer = require('./enums-replacer');
var mapAsReplacer = require('./mapAs-replacer');
var interactivityStateReplacer = require('./interactivity-state-replacer');

exports.migrate = function(code) {
    code = modulesReplacer.init(code);
    code = mapAsReplacer.init(code);
    code = interactivityStateReplacer.init(code);
    code = enumsReplacer.init(code);

    return code;
};