/**
 * @author Yaochao
 * @date 2017/9/8
 * @version 1.0
 */

TLabel = function () {
    var source = this;
    this.id = 'tlable_' + new Date().getTime();
    this.text = '<t-label contenteditable="true" id="' + this.id + '">单击此处添加文字</t-label>';
    $('#m_content').append(this.text);

    var ele = $('#' + this.id);
    ele.click(function () {
        var content = $(this).attr('content');
        if (window.utils.isUndefined(content)) {
            $(this).html('');
        }
        //用户点击时，激活其属性编辑面板
        window.pp.activateObject(source);
    });

    ele.blur(function () {
        var content = $(this).html();
        if (content.length == 0) {
            $(this).removeAttr('content');
            $(this).html('单击此处添加文字');
            $(this).removeClass('active');
        } else {
            $(this).attr('content', content);
            $(this).addClass('active');
        }
    });
};

TLabel.prototype.positionX = function (x) {
    var ele = $('#' + this.id);
    ele.css({
        'left': x + 'px'
    });
    this.x = x;
};

TLabel.prototype.positionY = function (y) {
    var ele = $('#' + this.id);
    ele.css({
        'top': y + 'px'
    });
    this.y = y;
};

TLabel.prototype.content = function () {
    return $('#' + this.id).html();
};

TLabel.prototype.destroy = function () {
    $(this).remove();
};
