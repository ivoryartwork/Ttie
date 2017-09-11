/**
 *
 * @author Yaochao
 * @date 2017/9/11
 * @version 1.0
 */
TContainer = {};

TContainer.hook = [];

TContainer.curr_page = 0;

TContainer.createTLabel = function () {
    var label = new TLabel();
    var page = this.hook[this.curr_page];
    page.append({
        type: 'label',
        id: label.id,
        text: label.text,
        content: label.content(),
        x: label.x,
        y: label.y,
        zIndex: 0 //默认堆叠顺序
    });
};

TContainer.prePage = function () {
    if (this.curr_page <= 0) {
        return;
    }
    this.curr_page = this.curr_page - 1;
    this.showPage();
};

TContainer.showPage = function () {

};

TContainer.createPage = function () {

};

TContainer.nextPage = function () {
    if (this.curr_page >= this.hook.length) {
        return;
    }
    this.curr_page = this.curr_page + 1;
    this.showPage();
};
