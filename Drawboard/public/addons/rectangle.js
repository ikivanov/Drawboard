(function () {
    var app = angular.module("DrawBox");
    
    var RectangleToolAddon = function () {
        this.title = 'Rectangle';
        this.hint = 'Draw a rectangle';
        this.displayOrder = 1;
    }
    
    app.run(function (AddonService) {
        AddonService.registerAddon('rectangleTool', new RectangleToolAddon());
    });
})();