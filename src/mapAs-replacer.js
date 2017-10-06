exports.init = function (res, wrapMark) {
    var code = res.code;

    code = code.replace(/\.mapAs\(\s*(('|"|)undefined('|"|)|('|"|)null('|"|))\s*\,\s*/g, wrapMark('.mapAs('));

    res.code = code;

    return res;
};