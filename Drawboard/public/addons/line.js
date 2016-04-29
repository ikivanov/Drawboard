(function () {
    var app = angular.module("DrawBox");
    
    var LineToolAddon = function () {
        this.title = 'Line';
        this.hint = 'Draw a line';
        this.displayOrder = 0;
    }

    app.run(function (AddonService) {
        AddonService.registerAddon('lineTool', new LineToolAddon());
    });
})();