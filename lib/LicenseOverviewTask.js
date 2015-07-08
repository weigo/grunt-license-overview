/*
 * LicenseOverviewTask
 *
 * Generate an overview of licenses of dependencies used in a project.
 *
 * Copyright (c) 2015 Dirk Weigenand
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs'), path = require('path'), process = require('process');

function LicenseCollector() {
    this.licenses = {};
    this.modules = {};
}

LicenseCollector.prototype = {
    add: function (packageSpec) {
        var module = this.modules[packageSpec.name] || {};
        module.description = module.description || packageSpec.description;
        module.name = module.name || packageSpec.name;
        module.homepage = module.homepage || packageSpec.homepage;
        module.version = module.version || packageSpec.version;
        this.modules[packageSpec.name] = module;

        function extractLicenses(licenseSpec) {
            var licenses = licenseSpec || [];

            if (typeof licenses === 'object' && !Array.isArray(licenses)) {
                licenses = licenses.type;
            }

            if (typeof licenses === 'string') {
                licenses = licenses.split(',');
            }

            return licenses;
        }

        extractLicenses(packageSpec.license).forEach(function (license) {
            var modules = this.licenses[license] || {};
            modules[packageSpec.name] = module;
            this.licenses[license] = modules;
        }, this);
    },
    getLicenses: function () {
        return this.licenses;
    }
};

function LicenseOverview(task) {
    this.options = task.options(LicenseOverview.Defaults);
}

LicenseOverview.prototype = {
    run: function (grunt) {
        var BowerConfigFinder = require('./bower-configuration-finder');
        var bower = BowerConfigFinder.find(), componentsFolder;
        var licenseCollector = new LicenseCollector();

        if (bower !== null && bower.directory) {
            componentsFolder = bower.directory;
        }
        else {
            componentsFolder = this.options.src;
        }

        if (!grunt.file.isDir(process.cwd(), componentsFolder)) {
            grunt.warn('Folder "' + componentsFolder + '" does not exist in "' + process.cwd() + '"!');
            return;
        }

        grunt.file.expand({cwd: componentsFolder}, '*/{package,bower}.json').forEach(function (config) {
            var conf = grunt.file.readJSON(componentsFolder + path.sep + config);
            licenseCollector.add(conf);
        });

        var formatter = require('./licenses-formatter');
        console.log(formatter.toXML);
        grunt.file.write('licenses.xml', formatter.toXML(licenseCollector.getLicenses()));
    }
};

LicenseOverview.Defaults = {
    src: 'bower_components'
};

LicenseOverview.taskName = 'license_overview';
LicenseOverview.taskDescription = 'Generate an overview of licenses used in a project.';

LicenseOverview.registerWithGrunt = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerTask(LicenseOverview.taskName, LicenseOverview.taskDescription, function () {
        var task = new LicenseOverview(this);

        task.run(grunt);
    });
};

module.exports = LicenseOverview;
