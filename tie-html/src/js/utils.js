/**
 *
 * @author Yaochao
 * @date 2017/9/8
 * @version 1.0
 */

(function (utils) {

    utils.notUndefined = function (o) {
        if (typeof(o) == 'undefined') {
            return false;
        }
        return true;
    };

    utils.isUndefined = function (o) {
        if (typeof(o) == 'undefined') {
            return true;
        }
        return false;
    };
}(window.utils = {}));
