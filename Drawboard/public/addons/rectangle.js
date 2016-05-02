(function () {
    var app = angular.module("DrawBox");
    
    var RectangleToolAddon = function (CommandService) {
        this.name = 'rectangleTool';
        this.title = 'Rectangle';
        this.hint = 'Draw a rectangle';
        this.displayOrder = 1;
        this.isDefault = false;

        this.mouseBtnPressed = false;
        this.originX, this.originY;
        
        var that = this;
        var commandService = CommandService;

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
            
            CommandService.registerCommand(new RectangleCommand({
                x1: that.originX,
                y1: that.originY,
                x2: event._x,
                y2: event._y
            }));

            that.context.drawImage(that.tempCanvas, 0, 0);
            that.tempContext.clearRect(0, 0, that.tempCanvas.width, that.tempCanvas.height);
        }

        this.draw = function (context, x1, y1, x2, y2, width, height) {
            var x = Math.min(x2, x1),
                y = Math.min(y2, y1),
                w = Math.abs(x2 - x1),
                h = Math.abs(y2 - y1);
            
            if (!w || !h) {
                return;
            }
            
            context.strokeRect(x, y, w, h);
        }

        this.drawCommand = function (context, command) {
            this.draw(context, command.x1, command.y1, command.x2, command.y2);
        }
    }
    
    var RectangleCommand = function (options) {
        this.toolName = 'rectangleTool';

        this.x1 = options.x1;
        this.y1 = options.y1;
        this.x2 = options.x2;
        this.y2 = options.y2;
    }
    
    app.run(function (AddonService, CommandService) {
        AddonService.registerAddon('rectangleTool', new RectangleToolAddon(CommandService));
    });
})();