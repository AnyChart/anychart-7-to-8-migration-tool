var interactivityState = require('./interactivity-state').normalized;

exports.init = function (res, wrapMark) {
    var code = res.code;
    var inputCode = code;

    var statePrefix = [
        {
            old: 'hover',
            new: '.hovered().'
        },
        {
            old: 'select',
            new: '.selected().'
        }
    ];

    var regExp;
    var i, j;
    var log = [];

    // replace selected state in data
    regExp = new RegExp('selected: true', 'g');
    code = code.replace(regExp, wrapMark('state: \'selected\''));

    // replace with method
    for (i = 0; i < interactivityState.length; i++) {
        for (j = 0; j < statePrefix.length; j++) {
            var state = toCamelCase('\\.' + statePrefix[j].old, interactivityState[i]);
            regExp = new RegExp(state);

            while (code.match(regExp)) {
                code = code.replace(regExp, wrapMark(statePrefix[j].new + interactivityState[i]));

                log.push({
                    old: state.replace(/\\/g, ''),
                    new: statePrefix[j].new + interactivityState[i]
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

    res.code = code;

    if (log.length) {
        res['state-warning'] = log;
    }

    return res;
};

function toCamelCase(prefix, state) {
    return prefix + state[0].toUpperCase() + state.slice(1)
}