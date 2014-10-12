/** @jsx React.DOM */

var React = require('react');
var Menu = require('./menu.js');
var ChartPanel = require('./chartpanel.js');



React.renderComponent(<ChartPanel title="Přehled za období" chartId="temperatureChart"/>, document.querySelector("#panel"));
React.renderComponent(<Menu/>, document.querySelector("#menu"));