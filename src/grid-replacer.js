exports.init = function (res, wrapMark) {
    var code = res.code;

    var exceptions = ['.annotations(', '.resource(', '.resourceList('];

    var gridNormalize = [
        {
            "old": ["\\.grid\\(", "\\.grid\\(0"],
            "new": ".yGrid("
        },
        {
            "old": ["\\.grid\\(1", "\\.grid\\(2"],
            "new": ".xGrid("
        },
        {
            "old": ["\\.minorGrid\\(", "\\.minorGrid\\(0"],
            "new": ".xMinorGrid("
        },
        {
            "old": ["\\.minorGrid\\(1", "\\.minorGrid\\(2"],
            "new": ".yMinorGrid("
        }
    ];

    var regExp;
    var i, j;
    var isExceptions = false;
    var log = [];

    for (i = 0; i < exceptions.length; i++) {
        if (~code.indexOf(exceptions[i])) {
            log.push(exceptions[i]);
            isExceptions = true;
            break;
        }
    }

    if (!isExceptions) {
        // replace with method
        for (i = 0; i < gridNormalize.length; i++) {
            for (j = 0; j < gridNormalize[i].old.length; j++) {
                var oldValue = gridNormalize[i].old[j];
                var newValue = gridNormalize[i].new;

                regExp = new RegExp(oldValue, 'g');

                // add method to log
                if (code.match(regExp)) {
                    log.push(oldValue, newValue);
                }

                code = code.replace(regExp, wrapMark(newValue));
            }
        }
    }

    res.code = code;
    res['grid-warning'] = log;

    return res;
};