var deprecatedApi = require('./deprecated-api').normalized;

exports.init = function (res, wrapMark) {
    var code = res.code;
    var i, j;
    var regExp;

    // replace deprecated api
    for (i = 0; i < deprecatedApi.length; i++) {
        for (j = 0; j < deprecatedApi[i].old.length; j++) {
            regExp = new RegExp(deprecatedApi[i].old[j], 'g');

            if (code.match(regExp)) {
                code = code.replace(regExp, wrapMark(deprecatedApi[i].new));
            }
        }
    }

    res.code = code;

    return res;
};


