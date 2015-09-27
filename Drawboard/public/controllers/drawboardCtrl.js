angular.module('DrawBox').controller('DrawboardController', function ($scope) {
    var canvas = null;
    var line = null;
    var mouseBtnPressed = false;
    var ctx;;
    
    $scope.init = function () {
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
    }

    $scope.onMouseDown = function (ev) {
        var e = ev;
        
        mouseBtnPressed = true;
        
        var x = ev.clientX - canvas.offsetParent.offsetLeft - canvas.offsetLeft;
        var y = ev.clientY - canvas.offsetParent.offsetTop - canvas.offsetTop;
        
        ctx.strokeRect(x, y, 1, 1);
    }

    $scope.onMouseUp = function (ev){
        mouseBtnPressed = false;
    }

    $scope.onMouseMove = function (ev) {
        if (!mouseBtnPressed) return;
        
        var x = ev.clientX - canvas.offsetParent.offsetLeft - canvas.offsetLeft;
        var y = ev.clientY - canvas.offsetParent.offsetTop - canvas.offsetTop;
        
        ctx.strokeRect(x, y, 1, 1);
    }
});