exports.init = function (res) {
    var code = res.code;

    res.code = code;

    return res;
};