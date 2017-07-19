var enums_replacer = require('./enums-replacer');

exports.migrate = function(code) {
    code = enums_replacer.replace(code);
    return code;
};