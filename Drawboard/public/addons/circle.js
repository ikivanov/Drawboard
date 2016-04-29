(function () {
    var app = angular.module("DrawBox");
    
    var CircleToolAddon = function () {
        this.title = 'Circle';
        this.hint = 'Draw a circle';
        this.displayOrder = 2;
    }

    app.run(function (AddonService) {
        AddonService.registerAddon('circleTool', new CircleToolAddon());
    });
})();