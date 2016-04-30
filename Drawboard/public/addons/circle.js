(function () {
    var app = angular.module("DrawBox");
    
    var CircleToolAddon = function () {
        this.name = 'circleTool';
        this.title = 'Circle';
        this.hint = 'Draw a circle';
        this.displayOrder = 2;

        this.onMouseDown = function (canvas, event) {

        }

        this.onMouseMove = function (canvas, event) {

        }

        this.onMouseUp = function (canvas, event) {

        }
    }

    app.run(function (AddonService) {
        AddonService.registerAddon('circleTool', new CircleToolAddon());
    });
})();