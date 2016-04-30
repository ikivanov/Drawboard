(function () {
    var app = angular.module("DrawBox");
    
    var LineToolAddon = function () {
        this.name = 'lineTool';
        this.title = 'Line';
        this.hint = 'Draw a line';
        this.displayOrder = 0;
        
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
            
            that.tempContext.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
            
            that.tempContext.beginPath();
            that.tempContext.moveTo(that.originX, that.originY);
            that.tempContext.lineTo(event._x, event._y);
            that.tempContext.stroke();
            that.tempContext.closePath();
        }
        
        this.mouseup = function (event) {
            if (!that.mouseBtnPressed) {
                return;
            }
            
            that.mousemove(event);
            that.mouseBtnPressed = false;

            that.context.drawImage(that.tempCanvas, 0, 0);
            that.tempContext.clearRect(0, 0, that.tempCanvas.width, that.tempCanvas.height);        }
    }

    app.run(function (AddonService) {
        AddonService.registerAddon('lineTool', new LineToolAddon());
    });
})();