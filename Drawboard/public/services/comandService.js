(function() {
    angular.module('DrawBox').service('CommandService', function (AddonService) {
        this.currentCommandIndex = -1;
        this.commands = [];
        
        this.registerCommand = function (command) {
            if (!command) {
                return;
            }
            
            if (this.currentCommandIndex < this.commands.length - 1) {
                this.commands.splice(this.currentCommandIndex + 1, this.commands.length - 1 - this.currentCommandIndex);
            }

            this.commands.push(command);
            this.currentCommandIndex++;
        }

        this.undo = function () {
            if (this.currentCommandIndex == -1) {
                return;
            }

            this.currentCommandIndex--;
            
            var context = AddonService.getToolByName(this.commands[0].toolName).context;
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);


            for (var i = 0; i <= this.currentCommandIndex; i++) {
                var command = this.commands[i];
                var tool = AddonService.getToolByName(command.toolName);
                
                if (!tool) {
                    new Error('Tool with name ' + command.toolName + ' does not exist!');
                }
                
                tool.drawCommand(tool.context, command);
            }
        }

        this.redo = function () {
            if (this.currentCommandIndex == this.commands.length - 1) {
                return;
            }

            this.currentCommandIndex++;

            var command = this.commands[this.currentCommandIndex];
            var tool = AddonService.getToolByName(command.toolName);

            tool.drawCommand(tool.context, command);
        }
    });
})();