(function() {
    angular.module('DrawBox').controller('DrawboardController', function ($scope, AddonService) {
        var canvas, tempCanvas = null;
        var mouseBtnPressed = false;
        $scope.drawingTools = {};
        $scope.currentTool = null;
    
        $scope.init = function () {
            canvas = document.getElementById('canvas');
            tempCanvas = document.getElementById('tempCanvas');

            $scope.drawingTools = AddonService.getAddons(canvas, tempCanvas);
        }
        
        $scope.onToolSelected = function (toolName) {
            $scope.currentTool = toolName;
        }
        
        $scope.mouseHandler = function(ev) {
            var tool = $scope.drawingTools[$scope.currentTool];

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
            var func = tool[ev.type];
            if (func) {
                func(ev);
            }
        }
    });
})();