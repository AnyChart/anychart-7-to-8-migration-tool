exports.init = function (res, wrapMark) {
    var code = res.code;
    var inputCode = code;

    var exceptions = ['.annotations(', '.resource(', '.resourceList('];

    var gridNormalize = [
        {
            "old": ["\\.grid\\(1"],
            "new": ".xGrid(1"
        },
        {
            "old": ["\\.grid\\(2"],
            "new": ".xGrid(2"
        },
        {
            "old": ["\\.grid\\(\\)"],
            "new": ".yGrid()"
        },
        {
            "old": ["\\.grid\\(0"],
            "new": ".yGrid(0"
        },
        {
            "old": ["\\.minorGrid\\(1"],
            "new": ".yMinorGrid(1"
        },
        {
            "old": ["\\.minorGrid\\(2"],
            "new": ".yMinorGrid(2"
        },
        {
            "old": ["\\.minorGrid\\(\\)"],
            "new": ".xMinorGrid()"
        },
        {
            "old": ["\\.minorGrid\\(0"],
            "new": ".xMinorGrid(0"
        },
        {
            "old": ["\\.grid\\("],
            "new": ".xGrid("
        },
        {
            "old": ["\\.minorGrid\\("],
            "new": ".xMinorGrid("
        }
    ];

    var regExp;
    var i, j;
    var isExceptions = false;
    var log = [];

    for (i = 0; i < exceptions.length; i++) {
        if (~code.indexOf(exceptions[i]) && (~code.indexOf('.grid(') || ~code.indexOf('.minorGrid('))) {
            log.push({
                exceptions: exceptions[i]
            });
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

                regExp = new RegExp(oldValue);

                while (code.match(regExp)) {
                    code = code.replace(regExp, wrapMark(newValue));

                    log.push({
                        old: oldValue.replace(/\\/g, ''),
                        new: newValue
                    });
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
    }

    res.code = code;

    if (log.length) {
        res['grid-warning'] = log;
    }

    return res;
};

