(function() {
    angular.module('DrawBox').service('AddonService', function () {
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

        this.getAddons = function () {
            return addons;
        }
    });
})();