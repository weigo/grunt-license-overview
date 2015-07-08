/**
 *
 */

'use strict';

function LicensesFormatter() {
    this.xmlBuilder = require('xmlbuilder');
}

LicensesFormatter.prototype = {
    toXML: function (licenses) {
        var root = this.xmlBuilder.create('licenses');

        Object.getOwnPropertyNames(licenses).forEach(function (license) {
            var element = root.ele('license', {'name': license});
            var currentLicense = licenses[license];

            Object.getOwnPropertyNames(currentLicense).forEach(function (moduleName) {
                var module = currentLicense[moduleName];
                element.ele('module', {
                    'name': moduleName,
                    'version': module.version,
                    'home-page': module.homepage || ''
                }).ele('description', {}, module.description || '');
            });
        });

        return root.end({pretty: true});
    },
    toHTML: function(licenses) {
        var xml = this.toXML(licenses);
    }
};

module.exports = new LicensesFormatter;
