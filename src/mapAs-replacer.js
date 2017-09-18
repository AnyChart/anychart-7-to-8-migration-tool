exports.init = function (res, wrapMark) {
    var code = res.code;

    var pos;
    var oldValue;
    var newValue;

    code = code.replace(/\.mapAs\(\s*(undefined|null)\,\s*/g, wrapMark('.mapAs('));

    while (~(pos = code.indexOf('.mapAs(', pos + 1))) {
        oldValue = code.substring(code.indexOf(')', pos), pos + '.mapAs('.length);

        try {
            newValue = eval('(' + oldValue + ')');

            if (typeof newValue === 'object') {
                for (key in newValue) {
                    if (newValue.hasOwnProperty(key) && Array.isArray(newValue[key]) && newValue[key].length <= 1) {
                        newValue[key] = newValue[key][0];
                    }
                }
            }

            code = code.replace(oldValue, wrapMark(JSON.stringify(newValue).replace(/\"\:/g, '": ').replace(/\,\"/g, ', "').replace(/\"/g, "'")));

        } catch (err) {
            res.code = code;

            return res;
        }
    }

    res.code = code;

    return res;
};