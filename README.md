
# WifiTemp [![Build Status](https://travis-ci.org/octopuss/wifitemp.svg?branch=wifitemp-react)](https://travis-ci.org/octopuss/wifitemp)


Dashboard for spark core powered digital thermometer. This version is based on javascript technology as much as possible.

Installation

    npm install -g bower
    npm install -g gulp
    bower install


Technologies
------------

**Development dependencies**

*   [Gulp](http://gulpjs.com/) - build tasks
*	[Node.js](http://nodejs.org/) - runtime + serverside packages
*	[Bower](http://bower.io/) - clientside dependencies
*	[webpack](http://webpack.github.io/) - clientside module bundler

**Application dependencies**

*   [jQuery](http://jquery.com/) - for ajax and plugins
*   [Chartjs](http://www.chartjs.org/) - data plots
*   [DateTimePicker](http://xdsoft.net/jqplugins/datetimepicker/) (need to be changed to work as CommonJs module see [jqueryPluginCommonjs](https://github.com/umdjs/umd/blob/master/jqueryPluginCommonjs.js))
*	[React](http://facebook.github.io/react/) - html rendering
*	[Flux](http://facebook.github.io/flux/docs/overview.html) - unidirectional data flow
*   [React-bootstrap](http://react-bootstrap.github.io/) - bootstrap components for react
*	[Bootstrap](http://getbootstrap.com/) - gui components
*   [Moment.js](http://momentjs.com/) - javascript datetime manipulation
*   [Promises.js](https://www.promisejs.org/) - asynchronous callbacks wrapper

**Other**

* [Travis CI](https://travis-ci.org/)

**Hardware**:

-   [Spark core](http://www.spark.io) - wifi enabled arduino compatible board
-   DS18B20 - temperature sensor
-   16x2 Display with I2C backpack - basic display
