var deprecatedApi = require('./deprecated-api').normalized;

exports.init = function (res, wrapMark) {
    var code = res.code;
    var inputCode = code;
    var i, j;
    var regExp;
    var log = [];

    /*text wrap warning*/
    if (code.match('.textWrap')) {
        res['text-wrap-warning'] = true;
    }
    /**/

    // replace deprecated api
    for (i = 0; i < deprecatedApi.length; i++) {
        for (j = 0; j < deprecatedApi[i].old.length; j++) {
            regExp = new RegExp(deprecatedApi[i].old[j]);

            while (code.match(regExp)) {
                if (deprecatedApi[i].regExp) {
                    if (code.match(new RegExp(deprecatedApi[i].regExp))) {
                        break;
                    } else {
                        code = code.replace(regExp, wrapMark(deprecatedApi[i].negative));
                    }

                } else {
                    code = code.replace(regExp, wrapMark(deprecatedApi[i].new));
                }

                if (deprecatedApi[i].warning) {
                    log.push({
                        old: deprecatedApi[i].old[j].replace(/\\/g, ''),
                        new: deprecatedApi[i].new
                    });
                }
            }
        }
    }

    var inputCodeLines = inputCode.split('\n');
    var outputCodeLines = code.split('\n');
    var isAdded = false;
    inputCodeLines.map(function (item, index) {
        for (i = 0; i < log.length; i++) {
            isAdded = false;

            if (item.indexOf(log[i].old) !== -1 && outputCodeLines[index].indexOf(log[i].new) !== -1) {
                for (var j = 0; j < log.length; j++) {
                    if (log[j].line === index + 1) {
                        isAdded = true;
                        break;
                    }
                }


                if (!log[i].hasOwnProperty('line') && !isAdded) {

                    log[i].line = index + 1;
                }
            }
        }
    });

    log = log.filter(function (item) {
        if (item.line) {
            return item
        }
    });

    res.code = code;

    if (log.length) {
        res['deprecated-api-warning'] = log;
    }

    return res;
};