var modules_replacer = require('./modules-replacer');
var enums_replacer = require('./enums-replacer');
var mapAs_replacer = require('./mapAs-replacer');

exports.migrate = function(code) {
    code = modules_replacer.init(code);
    code = mapAs_replacer.init(code);
    code = enums_replacer.init(code);

    return code;
};