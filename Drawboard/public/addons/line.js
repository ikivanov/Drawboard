(function () {
    var app = angular.module("DrawBox");
    
    var LineToolAddon = function (CommandService) {
        this.name = 'lineTool';
        this.title = 'Line';
        this.hint = 'Draw a line';
        this.displayOrder = 0;
        this.isDefault = true;
        
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
            
            that.draw(that.tempContext, that.originX, that.originY, event._x, event._y);
        }
        
        this.mouseup = function (event) {
            if (!that.mouseBtnPressed) {
                return;
            }
            
            that.mousemove(event);
            that.mouseBtnPressed = false;

            CommandService.registerCommand(new LineCommand({
                x1: that.originX,
                y1: that.originY,
                x2: event._x,
                y2: event._y
            }));

            that.context.drawImage(that.tempCanvas, 0, 0);
            that.tempContext.clearRect(0, 0, that.tempCanvas.width, that.tempCanvas.height);
        }

        this.draw = function (context, x1, y1, x2, y2) {
            context.beginPath();
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.stroke();
            context.closePath();
        }

        this.drawCommand = function (context, command) {
            this.draw(context, command.x1, command.y1, command.x2, command.y2);
        }
    }

    var LineCommand = function (options) {
        this.toolName = 'lineTool';
        
        this.x1 = options.x1;
        this.y1 = options.y1;
        this.x2 = options.x2;
        this.y2 = options.y2;
    }

    app.run(function (AddonService, CommandService) {
        AddonService.registerAddon('lineTool', new LineToolAddon(CommandService));
    });
})();