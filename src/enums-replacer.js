var enums = require('./enums.js');
var uuid = require('uuid');
var normalizedEnums = enums.normalized;
var conflictEnums = enums.conflicts;

String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
};

exports.init = function (res, wrapMark) {
    var inputCode = res.code;
    var outputCode;
    var i;

    var enumsWithMethods = [];
    var enumsWithOutMethods = [];

    var keys = {};
    var key = [];

    var conflictEnumMap = [];

    for (i = 0; i < normalizedEnums.length; i++) {
        if (normalizedEnums[i].methods) {
            enumsWithMethods.push(normalizedEnums[i])
        } else {
            enumsWithOutMethods.push(normalizedEnums[i])
        }
    }

    // sort by literal
    // long literal must be first replaced
    normalizedEnums.sort(function (a, b) {
        return b.literal.length - a.literal.length
    });

    // replace by literal
    for (i = 0; i < normalizedEnums.length; i++) {
        var replaceByLiteral = new RegExp(normalizedEnums[i].literal, 'g');

        if (~inputCode.indexOf(normalizedEnums[i].literal)) {
            key = [];

            for (k = 0; k < normalizedEnums[i].literal.length; k++) {
                key.push(uuid.v4());
            }

            keys[key] = normalizedEnums[i].new;

            inputCode = outputCode = inputCode.replace(replaceByLiteral, '"' + key + '"');
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
                var oldValue = inputCode.slice(posToReplace, inputCode.indexOf(')', pos)).toLowerCase();
                var countExcessSign = 0;
                var letterIndex = 0;
                var checkKey = oldValue.replace(/'|"|\(/g, '').split(',')[0];

                // check, if key
                if (checkKey.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i) === null && oldValue.match(/'|"/)) {
                    if (checkKey[0] === ':') {
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
                            var stageOldValue = null;
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

                    var newValue = enumsWithMethods[i].new;

                    if (conflictEnums.hasOwnProperty(methods)) {
                        var conflictValues = [];
                        for (var n = 0; n < conflictEnums[methods].length; n++) {
                            conflictValues = conflictValues.concat(conflictEnums[methods][n].value);
                        }
                    }

                    // check, if conflict enum replace with conflict method else replace with method
                    if (conflictEnums.hasOwnProperty(methods) && conflictValues.indexOf(oldValue) !== -1) {
                        for (n = 0; n < conflictEnums[methods].length; n++) {
                            if (conflictEnums[methods][n].value.indexOf(oldValue) !== -1) {
                                var conflictReg = conflictEnums[methods][n].regexp;
                                var conflictPositive = conflictEnums[methods][n].positive;
                                var conflictNegative = conflictEnums[methods][n].negative;
                                var _checkKey = inputCode.slice(posToReplace, inputCode.indexOf(')', pos)).replace(/'|"|\(/g, '').split(',')[0];

                                if (inputCode.match(conflictReg) === null) {
                                    newValue = conflictNegative;
                                } else if (typeof conflictPositive === 'object') {
                                    newValue = conflictPositive[inputCode.match(conflictReg)];
                                } else {
                                    newValue = conflictPositive;
                                }

                                if (_checkKey.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i) === null && newValue) {
                                    key = [];

                                    for (var k = 0; k < oldValue.length; k++) {
                                        key.push(uuid.v4());
                                    }

                                    inputCode = outputCode = inputCode.replaceAt(posToReplace + countExcessSign, key);
                                    keys[key] = newValue;

                                    var lines = outputCode.split('\n');
                                    var line = 0;
                                    lines.map(function (item, index) {
                                        if (~item.indexOf(key)) {
                                            line = ++index;
                                        }
                                    });
                                    conflictEnumMap.push({
                                        new: newValue,
                                        old: oldValue,
                                        method: methods,
                                        line: line
                                    })
                                }
                            }
                        }
                    } else if (oldValue && enumsWithMethods[i].old.indexOf(oldValue) !== -1) {
                        key = [];

                        for (k = 0; k < oldValue.length; k++) {
                            key.push(uuid.v4());
                        }

                        outputCode = inputCode.replaceAt(posToReplace + countExcessSign, key);
                        if (inputCode[posToReplace + countExcessSign - 1].match(/'|"/) === null) {
                            newValue = "'" + newValue + "'";
                        }
                        keys[key] = newValue;
                        inputCode = outputCode;
                        oldValue = '';
                    }
                }
            }
        }
    }

    // replace with out methods
    for (i = 0; i < enumsWithOutMethods.length; i++) {
        for (j = 0; j < enumsWithOutMethods[i].old.length; j++) {
            var replaceByOldValue = new RegExp("'" + enumsWithOutMethods[i].old[j] + "'", 'g');
            var _replaceByOldValue = new RegExp('"' + enumsWithOutMethods[i].old[j] + '"', 'g');
            var q_mark = inputCode.match(replaceByOldValue) ? "'" : '"';

            if ((inputCode.match(replaceByOldValue) || inputCode.match(_replaceByOldValue)) &&
                enumsWithOutMethods[i].old[j] && enumsWithOutMethods[i].old[j] !== enumsWithOutMethods[i].new &&
                '%' + enumsWithOutMethods[i].old[j] !== enumsWithOutMethods[i].new) {

                key = [];

                for (k = 0; k < enumsWithOutMethods[i].old[j].length; k++) {
                    key.push(uuid.v4());
                }

                keys[key] = q_mark + enumsWithOutMethods[i].new + q_mark;

                inputCode = outputCode = inputCode.replace(replaceByOldValue, key).replace(_replaceByOldValue, key);
            }
        }
    }

    // replace by key
    for (key in keys) {
        if (keys.hasOwnProperty(key)) {
            var replaceByKey = new RegExp(key, 'g');

            outputCode = outputCode.replace(replaceByKey, wrapMark(keys[key]));
        }
    }

    res.code = outputCode ? outputCode : inputCode;

    if (conflictEnumMap.length) {
        res['enums-warning'] = conflictEnumMap;
    }

    return res;
};