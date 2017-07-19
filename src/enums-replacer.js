var enums = require('./enums.js');
var uuid = require('uuid');
var normalizedEnums = enums.normalized;
var conflictEnums = enums.conflicts;

exports.replace = function (code) {
    var inputCode = code;
    var outputCode;
    var i;
    var timeStampLength = new Date().getTime().toString().length;

    var conflictsMsg = {};

    var enumsWithMethods = [];
    var enumsWithOutMethods = [];

    var keys = {};
    var key = [];

    var log = {};
    log.conflict = [];

    for (i = 0; i < normalizedEnums.length; i++) {
        if (normalizedEnums[i].methods) {
            enumsWithMethods.push(normalizedEnums[i])
        } else {
            enumsWithOutMethods.push(normalizedEnums[i])
        }
    }

    // replace by literal
    for (i = 0; i < normalizedEnums.length; i++) {
        var replaceByLiteral = new RegExp(normalizedEnums[i].literal, 'g');

        if (inputCode.match(replaceByLiteral) && !inputCode[inputCode.indexOf(normalizedEnums[i].literal) + normalizedEnums[i].literal.length].match(/_|[A-z]]/)) {
            key = [];

            for (k = 0; k < normalizedEnums[i].literal.length; k++) {
                key.push(uuid.v4());
            }

            keys[key] = normalizedEnums[i].new;

            outputCode = inputCode.replace(replaceByLiteral, '"' + key + '"');
            inputCode = outputCode;
        }
    }

    // replace with methods
    for (i = 0; i < enumsWithMethods.length; i++) {
        inputCode = outputCode ? outputCode : inputCode;
        var methods = enumsWithMethods[i].methods;

        for (var j = 0; j < methods.length; j++) {
            var pos;

            while ((pos = inputCode.indexOf(methods[j], pos + 1)) != -1) {
                var posToReplace = pos + methods[j].length;
                var oldValue = inputCode.slice(posToReplace, inputCode.indexOf(')', pos));
                var countExcessSign = 0;
                var letterIndex = 0;
                var checkKey = oldValue.replace(/'|"|\(/g, '').split(',')[0];

                // check, if key
                if (timeStampLength !== checkKey.length || Number.isNaN(Date.parse(new Date(+checkKey)))) {
                    if (oldValue[0] === ':') {
                        for (letterIndex = 0; letterIndex < oldValue.length; letterIndex++) {
                            if (!oldValue[letterIndex].match(/[A-z]|[0-9]/)) {
                                countExcessSign++;
                            } else {
                                break;
                            }
                        }

                        oldValue = oldValue.slice(countExcessSign);

                        var compareArr = [oldValue.indexOf('}'), oldValue.indexOf('/'), oldValue.indexOf(',')];
                        indexToSlice = Math.min.apply(null, compareArr.filter(function (index) {
                            return index > 0
                        }));

                        oldValue = oldValue.slice(0, indexToSlice).replace(/\'|\"|\(|\)/g, '').trim();

                    } else if (oldValue[0] === '(') {
                        if (oldValue.match(/,/) !== null) {
                            var stageOldValue;
                            var enumsWithMethodOldValues = enumsWithMethods[i].old;

                            enumsWithMethodOldValues.sort(function (a, b) {
                                return b.length - a.length
                            });

                            for (var t = 0; t < enumsWithMethodOldValues.length; t++) {
                                var stringEnum = new RegExp("'" + enumsWithMethodOldValues[t] + "'");
                                var _stringEnum = new RegExp('"' + enumsWithMethodOldValues[t] + '"');

                                if (oldValue.match(stringEnum) !== null || oldValue.match(_stringEnum) !== null) {
                                    stageOldValue = oldValue.match(enumsWithMethodOldValues[t]);
                                    break;
                                }
                            }

                            if (stageOldValue && stageOldValue !== null && (!oldValue[stageOldValue.index - 1].match(/[A-z]/) || !oldValue[stageOldValue.index + 1].match(/[A-z]/))) {
                                countExcessSign = stageOldValue.index;
                                oldValue = stageOldValue[0];
                            }
                        }

                        for (letterIndex = 0; letterIndex < oldValue.length; letterIndex++) {
                            if (!oldValue[letterIndex].match(/[A-z]|[0-9]/)) {
                                countExcessSign++;
                            } else {
                                break;
                            }
                        }

                        oldValue = oldValue.replace(/\'|\"|\(|\)/g, '').trim();
                    }
                }

                if (conflictEnums.hasOwnProperty(methods) && conflictEnums[methods].indexOf(oldValue) !== -1) {
                    if (conflictsMsg[methods]) {
                        if (conflictsMsg[methods].indexOf(oldValue) === -1) {
                            if (!Array.isArray(conflictsMsg[methods])) {
                                conflictsMsg[methods] = [conflictsMsg[methods]];
                            } else {
                                conflictsMsg[methods].push(oldValue);
                            }
                        }
                    } else {
                        conflictsMsg[methods] = oldValue;
                    }
                } else {
                    if (oldValue) {
                        var newValue = enumsWithMethods[i].new;

                        if (enumsWithMethods[i].old.indexOf(oldValue) !== -1) {
                            key = [];

                            for (var k = 0; k < oldValue.length; k++) {
                                key.push(uuid.v4());
                            }

                            outputCode = inputCode.replaceAt(posToReplace + countExcessSign, key);
                            if (inputCode[posToReplace + countExcessSign - 1].match(/'|"/) === null) {
                                newValue = '"' + newValue + '"';
                            }
                            keys[key] = newValue;
                            inputCode = outputCode;
                        }
                    }
                }
            }
        }
    }

    // replace with out methods
    for (i = 0; i < enumsWithOutMethods.length; i++) {
        var replaceByOldValue = new RegExp("'" + enumsWithOutMethods[i].old[0] + "'", 'g');
        var _replaceByOldValue = new RegExp('"' + enumsWithOutMethods[i].old[0] + '"', 'g');

        if ((inputCode.match(replaceByOldValue) || inputCode.match(_replaceByOldValue)) &&
            enumsWithOutMethods[i].old[0] && enumsWithOutMethods[i].old[0] !== enumsWithOutMethods[i].new &&
            '%' + enumsWithOutMethods[i].old[0] !== enumsWithOutMethods[i].new) {

            key = [];

            for (k = 0; k < enumsWithOutMethods[i].old[0].length; k++) {
                key.push(uuid.v4());
            }

            keys[key] = '"' + enumsWithOutMethods[i].new + '"';

            outputCode = inputCode
                .replace(replaceByOldValue, key)
                .replace(_replaceByOldValue, key);
            inputCode = outputCode;
        }
    }

    // replace by key
    for (key in keys) {
        if (keys.hasOwnProperty(key)) {
            var replaceByKey = new RegExp(key, 'g');
            outputCode = outputCode.replace(replaceByKey, keys[key]);
        }
    }

    if (Object.keys(conflictsMsg).length) {
        for (method in conflictsMsg) {
            log.conflict.push({
                method: method,
                value: conflictsMsg[method]
            });
        }
    }

    return {
        code: outputCode,
        conflict: log.conflict
    };

    function getRandomArbitrary(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
};

String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
};