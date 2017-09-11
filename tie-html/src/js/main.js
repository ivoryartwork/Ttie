(function (main) {

    main.init = function () {
        $('#create_label').click(function () {
            TContainer.createTLabel();
        });

        window.pp.tposition();
    };
}(window.TMain = {}));
