/** @jsx React.DOM */

var React = require('react');
var Menu = require('./menu.js');
var ChartPanel = require('./chartpanel.js');
var LatestReading = require('./latestreading.js');
var DatetimeSelector = require('./datetimeselector.js');



React.renderComponent(<ChartPanel title="Přehled za období" chartId="temperatureChart"/>, document.querySelector("#panel"));
React.renderComponent(<Menu/>, document.querySelector("#menu"));
React.renderComponent(<LatestReading/>, document.querySelector("#latest-reading"));
React.renderComponent(<DatetimeSelector/>, document.querySelector("#datetime-selector"));