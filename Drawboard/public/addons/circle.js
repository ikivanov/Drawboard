(function () {
    var app = angular.module("DrawBox");
    
    var CircleToolAddon = function (CommandService) {
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
            
            that.draw(that.tempContext, that.originX, that.originY, event._x, event._y);
        }

        this.mouseup = function (event) {
            if (!that.mouseBtnPressed) {
                return;
            }
            
            that.mousemove(event);
            that.mouseBtnPressed = false;
            
            CommandService.registerCommand(new CircleCommand({
                x1: that.originX,
                y1: that.originY,
                x2: event._x,
                y2: event._y
            }));

            that.context.drawImage(that.tempCanvas, 0, 0);
            that.tempContext.clearRect(0, 0, that.tempCanvas.width, that.tempCanvas.height);
        }

        this.draw = function (context, x1, y1, x2, y2) {
            var x = Math.min(x1, x2),
                y = Math.min(y1, y2),
                w = Math.abs(x2 - x1),
                h = Math.abs(y2 - y1);
            
            if (!w || !h) {
                return;
            }
            
            var radius = w / 2;
            x += radius;
            y += radius;
            
            context.beginPath();
            context.arc(x, y, radius, 0, 2 * Math.PI);
            context.stroke();
        }
        
        this.drawCommand = function (context, command) {
            this.draw(context, command.x1, command.y1, command.x2, command.y2);
        }
    }

    var CircleCommand = function (options) {
        this.toolName = 'circleTool';
        
        this.x1 = options.x1;
        this.y1 = options.y1;
        this.x2 = options.x2;
        this.y2 = options.y2;
    }

    app.run(function (AddonService, CommandService) {
        AddonService.registerAddon('circleTool', new CircleToolAddon(CommandService));
    });
})();