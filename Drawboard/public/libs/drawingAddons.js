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
(function () {
    var app = angular.module("DrawBox");
    
    var LineToolAddon = function () {
        this.name = 'lineTool';
        this.title = 'Line';
        this.hint = 'Draw a line';
        this.displayOrder = 0;
        
        var mouseBtnPressed = false;
        
        var originX, originY;    
        this.onMouseDown = function (canvas, event) {
            debugger;
            mouseBtnPressed = true;
            
            var ctx = canvas.getContext("2d");
        
            originX = event.clientX;
            originY = event.clientY;
        }
        
        this.onMouseMove = function (canvas, event) {
            if (!mouseBtnPressed) {
                return;
            }

            var ctx = canvas.getContext("2d");
            
            var x = event.clientX;
            var y = event.clientY;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.moveTo(originX, originY);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
        
        this.onMouseUp = function (canvas, event) {
            mouseBtnPressed = false;
        }
    }

    app.run(function (AddonService) {
        AddonService.registerAddon('lineTool', new LineToolAddon());
    });
})();
(function () {
    var app = angular.module("DrawBox");
    
    var RectangleToolAddon = function () {
        this.name = 'rectangleTool';
        this.title = 'Rectangle';
        this.hint = 'Draw a rectangle';
        this.displayOrder = 1;

        this.onMouseDown = function (canvas, event) {

        }
        
        this.onMouseMove = function (canvas, event) {

        }
        
        this.onMouseUp = function (canvas, event) {

        }
    }
    
    app.run(function (AddonService) {
        AddonService.registerAddon('rectangleTool', new RectangleToolAddon());
    });
})();