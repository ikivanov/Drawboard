(function() {
    angular.module('DrawBox').controller('DrawboardController', function ($scope, AddonService, CommandService) {
        var canvas, tempCanvas = null;
        var mouseBtnPressed = false;
        $scope.drawingTools = {};
        $scope.currentTool = {
            name: '',
            instance: null
        };
        $scope.currentTool;
    
        $scope.init = function () {
            canvas = document.getElementById('canvas');
            tempCanvas = document.getElementById('tempCanvas');

            $scope.drawingTools = AddonService.getAddons(canvas, tempCanvas);
            var defaultTool = AddonService.getDefaultTool();
            if (defaultTool) {
                $scope.currentTool.instance = defaultTool;
                $scope.currentTool.name = defaultTool.name
            }
        }
        
        $scope.onToolChanged = function (name) {
            $scope.currentTool.instance = $scope.drawingTools.find(function (tool) {
                return tool.name === name;
            });
        }
        
        $scope.mouseHandler = function(ev) {
            if (!$scope.currentTool.instance) {
                return;
            }

            // Firefox
            if (ev.layerX || ev.layerX == 0) {
                ev._x = ev.layerX;
                ev._y = ev.layerY;
	        // Opera
            } else if (ev.offsetX || ev.offsetX == 0) {
                ev._x = ev.offsetX;
                ev._y = ev.offsetY;
            }
            
            // Call the event handler of the tool
            var func = $scope.currentTool.instance[ev.type];
            if (func) {
                func(ev);
            }
        }

        $scope.onUndo = function () {
            CommandService.undo();
        }

        $scope.onRedo = function () {
            CommandService.redo();
        }
    });
})();