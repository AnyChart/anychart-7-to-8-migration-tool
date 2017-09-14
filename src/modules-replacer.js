var modules = require('./modules.js').modules;

if (!String.prototype.splice) {
    String.prototype.splice = function (start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}

exports.init = function (res, wrapMark) {
    var argv = require('minimist')(process.argv.slice(2));

    var code = res.code;

    var cdnAnyChart = 'https://cdn.anychart.com';
    
    var acProductScripts = [
        'anychart-bundle.min.js',
        'anychart.min.js',
        'anystock.min.js',
        'anymap.min.js',
        'anygantt.min.js',

        'anychart-bundle.js',
        'anychart.js',
        'anystock.js',
        'anymap.js',
        'anygantt.js'
    ];
    
    var acThemeScripts = [
        'dark_blue.min.js', 'light_blue.min.js', 'dark_earth.min.js',
        'light_earth.min.js', 'dark_glamour.min.js', 'light_glamour.min.js',
        'dark_provence.min.js', 'light_provence.min.js', 'dark_turquoise.min.js',
        'light_turquoise.min.js', 'coffee.min.js', 'monochrome.min.js', 'morning.min.js',
        'pastel.min.js', 'sea.min.js', 'wines.min.js',

        'dark_blue.js', 'light_blue.js', 'dark_earth.js',
        'light_earth.js', 'dark_glamour.js', 'light_glamour.js',
        'dark_provence.js', 'light_provence.js', 'dark_turquoise.js',
        'light_turquoise.js', 'coffee.js', 'monochrome.js', 'morning.js',
        'pastel.js', 'sea.js', 'wines.js'
    ];

    var acPartLinks = [
        'anychart-ui.min.css',
        'anychart-ui.css'
    ];

    var path = argv.l;

    var scriptComponent = !path ? '<script src="' + cdnAnyChart + '/js/_AC-VERSION_/_COMPONENT_"></script>' :
        '<script src="_LOCAL-PATH_/_COMPONENT_"></script>';

    var scriptTheme =!path ? '<script src="' + cdnAnyChart + '/themes/_AC-VERSION_/_COMPONENT_"></script>' :
        '<script src="_LOCAL-PATH_/_COMPONENT_"></script>';

    var link  = !path ? '<link href="' + cdnAnyChart + '/css/_AC-VERSION_/_COMPONENT_">' :
        '<link rel="stylesheet" href="_LOCAL-PATH_/_COMPONENT_">';

    var acBase = 'anychart-base.min.js';
    var version = argv.v || '8.0.0';
    var acModules = [];
    var module;
    var localPath;

    var isBundleJs = argv.b !== 'false';

    // modules that work with tree data
    var modulesTreeData = ['anychart-gantt', 'anychart-treemap', 'anychart-pert'];
    var treeDataModuleWasAdded = false;

    /*get modules list from code*/
    for (var i = 0; i < modules.length; i++) {
        for (var j = 0; j < modules[i].keys.length; j++) {
            if (~code.indexOf(modules[i].keys[j])) {
                for (var k = 0; k < modules[i].module.length; k++) {
                    module = !path ? '\n\t<script src="' + cdnAnyChart + '/js/_AC-VERSION_/' + modules[i].module[k] + '.min.js"></script>' :
                    '\n\t<script src="_LOCAL-PATH_/' + modules[i].module[k] + '.min.js"></script>';
                    acModules.push(module);
                }
                break;
            }
        }
    }
    /**/

    /* add a anychart-treemap module if the construct for tree data has not been added */
    for (i = 0; i < acModules.length; i++) {
        for (j = 0; j < modulesTreeData.length; j++) {
            if (~acModules[i].indexOf(modulesTreeData[j] + '.min.js')) {
                treeDataModuleWasAdded = true;
                break;
            }
        }
    }

    if (~code.indexOf('anychart.data.tree') && !treeDataModuleWasAdded) {
        module = !path ? '\n\t<script src="' + cdnAnyChart + '/js/_AC-VERSION_/' + 'anychart-treemap' + '.min.js"></script>' :
        '\n\t<script src="_LOCAL-PATH_/' + 'anychart-treemap' + '.min.js"></script>';

        if (~code.indexOf('anychart-resource.min.js')) {
            module = module.replace('anychart-treemap.min.js', 'anychart-gantt.min.js');
        }

        acModules.push(module);
    }
    /**/

    /*replace ac-script to ac-base*/
    for (i = 0; i < acProductScripts.length; i++) {
        if (~code.indexOf(acProductScripts[i])) {
            var pos = code.indexOf(acProductScripts[i]);
            var partToReplace = code.slice(code.lastIndexOf('<script', pos), code.indexOf('</script>', pos) + '</script>'.length);

            localPath = partToReplace.substring(partToReplace.lastIndexOf('src=', partToReplace.indexOf(acProductScripts[i])) + 'src='.length + 1, partToReplace.indexOf(acProductScripts[i]));
            code = code.replace(partToReplace, wrapMark(scriptComponent.replace('_COMPONENT_', acBase)));
            break;
        }
    }
    /**/

    if (pos) {
        /*remove old js files*/
        acProductScripts.push('data-adapter.min.js', 'anychart-ui.min.js');

        for (i = 0; i < acProductScripts.length; i++) {
            if (~code.indexOf(acProductScripts[i])) {
                partToReplace = code.slice(code.lastIndexOf('<script', code.indexOf(acProductScripts[i])), code.indexOf('</script>', code.indexOf(acProductScripts[i])) + '</script>'.length);
                code = code.replace(partToReplace, '');
            }
        }
        /**/

        if (isBundleJs) {
            code = code.replace(acBase, 'anychart-bundle.min.js');
        } else {
            /*add modules*/
            var insertPosition = code.indexOf('</script>', code.indexOf(acBase)) + '</script>'.length;
            code = code.splice(insertPosition, 0, acModules.join(''));
            /**/
        }
    }

    /*replace ac-theme-scripts version*/
    for (i = 0; i < acThemeScripts.length; i++) {
        if (~code.indexOf(acThemeScripts[i])) {
            pos = code.indexOf(acThemeScripts[i]);
            partToReplace = code.slice(code.lastIndexOf('<script', pos), code.indexOf('</script>', pos) + '</script>'.length);

            code = code.replace(partToReplace, wrapMark(scriptTheme.replace('_COMPONENT_', acThemeScripts[i])));
        }
    }
    /**/

    /*replace ac-part-links version*/
    for (i = 0; i < acPartLinks.length; i++) {
        if (~code.indexOf(acPartLinks[i])) {
            pos = code.indexOf(acPartLinks[i]);
            partToReplace = code.slice(code.lastIndexOf('<link', pos), code.indexOf('>', pos) + 1);

            code = code.replace(partToReplace, wrapMark(link.replace('_COMPONENT_', acPartLinks[i])));
        }
    }
    /**/

    /*replace path*/
    var pathToFile = path === 'true' ? true : path === 'false' ? false : path;
    if (pathToFile) {
        code = code.replace(/_LOCAL-PATH_\//g, typeof pathToFile === 'boolean' ? localPath : pathToFile);
    }
    /**/

    /*replace version*/
     code = code.replace(/_AC-VERSION_/g, version);
    /**/

    res.code = code;

    return res;
};