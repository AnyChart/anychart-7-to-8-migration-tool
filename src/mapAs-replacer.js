exports.init = function (code) {
    var pos;
    var oldValue;
    var newValue;

    code = code.replace(/\.mapAs\(\s*(undefined|null)\,\s*/g, '.mapAs(');

    while (~(pos = code.indexOf('.mapAs(', pos + 1))) {
        oldValue = code.substring(code.indexOf(')', pos), pos + '.mapAs('.length);

        try {
            newValue = eval('(' + oldValue + ')');

            if (typeof newValue === 'object') {
                for (key in newValue) {
                    if (Array.isArray(newValue[key]) && newValue[key].length <= 1) {
                        newValue[key] = newValue[key][0];
                    }
                }
            }

            code = code.replace(oldValue, JSON.stringify(newValue).replace(/\"\:/g, '": ').replace(/\,\"/g, ', "').replace(/\"/g, "'"));

        } catch (err) {
            return code
        }
    }

    return code
};