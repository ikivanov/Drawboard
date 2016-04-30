(function() {
    angular.module('DrawBox').service('AddonService', function () {
        var addonsInitialized = false;
        var addons = {};

        this.registerAddon = function (name, addon) {
            if (!name) {
                throw new Error('Addon name should be provided!');
            }

            if (!addon) {
                throw new Error('Addon instance should be provided!');
            }

            if (addons[name]) {
                throw new Error('Addon with name = ' + name + ' already registered!');
            }

            addons[name] = addon;
        }
        


        this.getAddons = function (canvas, tempCanvas) {
            if (!addonsInitialized) {
                for (var key in addons) {
                    var addon = addons[key];
                    
                    addon.canvas = canvas;
                    addon.context = canvas.getContext('2d');
                    addon.tempCanvas = tempCanvas;
                    addon.tempContext = tempCanvas.getContext('2d');
                }

                addonsInitialized = true;
            }

            return addons;
        }
    });
})();