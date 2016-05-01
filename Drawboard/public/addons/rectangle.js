(function () {
    var app = angular.module("DrawBox");
    
    var RectangleToolAddon = function () {
        this.name = 'rectangleTool';
        this.title = 'Rectangle';
        this.hint = 'Draw a rectangle';
        this.displayOrder = 1;
        this.isDefault = false;

        this.mouseBtnPressed = false;
        this.originX, this.originY;
        
        var that = this;

        this.mousedown = function (event) {
            that.mouseBtnPressed = true;

            that.originX = event._x;
            that.originY = event._y;
        }
        
        this.mousemove = function (event) {
            if (!that.mouseBtnPressed) {
                return;
            }
        
            that.tempContext.clearRect(0, 0, that.tempCanvas.width, that.tempCanvas.height);

            var x = Math.min(event._x, that.originX),
                y = Math.min(event._y, that.originY),
                w = Math.abs(event._x - that.originX),
                h = Math.abs(event._y - that.originY);
            
            if (!w || !h) {
                return;
            }
            
            that.tempContext.strokeRect(x, y, w, h);
        }
        
        this.mouseup = function (event) {
            if (!that.mouseBtnPressed) {
                return;
            }

            that.mousemove(event);
            that.mouseBtnPressed = false;

            that.context.drawImage(that.tempCanvas, 0, 0);
            that.tempContext.clearRect(0, 0, that.tempCanvas.width, that.tempCanvas.height);
        }
    }
    
    app.run(function (AddonService) {
        AddonService.registerAddon('rectangleTool', new RectangleToolAddon());
    });
})();