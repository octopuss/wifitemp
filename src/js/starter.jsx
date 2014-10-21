/** @jsx React.DOM */

var React = require('react');
var App = require('./app.js');
var ChartStore = require('../src/js/ChartStore');

var Starter={
    main:function(data) {
    ChartStore.setup(data);
    React.renderComponent(<App/>,document.querySelector('body'));
    }
};

module.exports=Starter;