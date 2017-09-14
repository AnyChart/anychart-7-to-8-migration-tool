var interactivityState = require('./interactivity-state').normalized;

exports.init = function (res, wrapMark) {
    var code = res.code;

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

    var imageSettings = [
        {
            old: '\\.fill\\(',
            new: '.normal().fill('
        },
        {
            old: '\\.stroke\\(',
            new: '.normal().stroke('
        }
    ];

    var regExp;
    var i, j;
    var log = [];

    // replace selected state in data
    regExp = new RegExp('selected: true', 'g');
    code = code.replace(regExp,  wrapMark('state: \'selected\''));

    // replace fill/stroke methods with prefix(.normal())
    for (j = 0; j < imageSettings.length; j++) {
        regExp = new RegExp(imageSettings[j].old, 'g');
        code = code.replace(regExp, wrapMark(imageSettings[j].new));
    }

    // replace with method
    for (i = 0; i < interactivityState.length; i++) {
        for (j = 0; j < statePrefix.length; j++) {
            var state = toCamelCase('\\.' + statePrefix[j].old, interactivityState[i]);
            regExp = new RegExp(state, 'g');

            // add method to log
            if (code.match(regExp)) {
                log.push(state);
            }

            code = code.replace(regExp, wrapMark(statePrefix[j].new + interactivityState[i]));
        }
    }

    res.code = code;
    res['interactivity-state-warning'] = log;

    return res;
};

function toCamelCase(prefix, state) {
    return prefix + state[0].toUpperCase() + state.slice(1)
}