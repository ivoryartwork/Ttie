/**
 * @author Yaochao
 * @date 2017/9/8
 * @version 1.0
 */
(function (pp) {

    var activeObject;

    pp.activateObject = function (tobject) {
        activeObject = tobject;
    };

    /**
     *当前元素的位置面板
     */
    pp.tposition = function () {
        $('.pp-position .x').bind('input propertychange', function () {
            var x = $(this).val();
            activeObject.css({
                'left': x + 'px'
            });
        });

        $('.pp-position .y').bind('input propertychange', function () {
            var y = $(this).val();
            activeObject.css({
                'top': y + 'px'
            });
        });
        //限制只能输入数字
    };
}(window.pp = {}));
