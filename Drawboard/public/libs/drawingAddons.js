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