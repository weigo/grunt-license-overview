# license-overview

> Generate an overview of licenses used in a project.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install license-overview --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('license-overview');
```

## The "license_overview" task

### Overview
In your project's Gruntfile, add a section named `license_overview` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  license_overview: {
    options: {
      // Task-specific options go here.
    }
  },
})
```

### Options

#### options.src
Type: `String`
Default value: `'bower_components'`

A string value that is used to do determine the folder where bower puts the components used in the project.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  license_overview: {
    options: {}
  },
})
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  license_overview: {
    options: {
      src: 'lib'
    }
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2015 Dirk Weigenand. Licensed under the MIT license.
