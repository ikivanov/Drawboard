(function() {
    angular.module('DrawBox').service('AddonService', function () {
        var addonsInitialized = false;
        var addons = [];

        this.registerAddon = function (name, addon) {
            if (!name) {
                throw new Error('Addon name should be provided!');
            }

            if (!addon) {
                throw new Error('Addon instance should be provided!');
            }
            
            var a = addons.find(function (addon) { 
                return addon.name === name;
            });

            if (a) {
                throw new Error('Addon with name = ' + name + ' already registered!');
            }

            addons.push(addon);
        }

        this.getAddons = function (canvas, tempCanvas) {
            if (!addonsInitialized) {
                for (var i = 0; i < addons.length; i++) {
                    var addon = addons[i];
                    
                    addon.canvas = canvas;
                    addon.context = canvas.getContext('2d');
                    addon.tempCanvas = tempCanvas;
                    addon.tempContext = tempCanvas.getContext('2d');
                }

                addonsInitialized = true;
            }
            
            return addons;
        }

        this.getDefaultTool = function () {
            return addons.find(function (addon) {
                return addon.isDefault === true;
            });
        }
    });
})();