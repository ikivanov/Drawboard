(function () {
    var app = angular.module("DrawBox");
    
    var CircleToolAddon = function () {
        this.name = 'circleTool';
        this.title = 'Circle';
        this.hint = 'Draw a circle';
        this.displayOrder = 2;
        this.isDefault = false;

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
            
            var radius = w / 2;
            x += radius;
            y += radius;

            that.tempContext.beginPath();
            that.tempContext.arc(x, y, radius, 0, 2 * Math.PI);
            that.tempContext.stroke();            
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
        AddonService.registerAddon('circleTool', new CircleToolAddon());
    });
})();