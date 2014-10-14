/** @jsx React.DOM */


app={};
app.main = function(data) {
var React = require('react');
var Menu = require('./menu.js');
var ChartPanel = require('./chartpanel.js');
var LatestReading = require('./latestreading.js');
var DatetimeSelector = require('./datetimeselector.js');
var LastUpdated = require('./lastupdated.js');
var ChartStore = require('../src/js/ChartStore');

ChartStore.setup(data);

React.renderComponent(<ChartPanel title="Přehled za období" chartId="temperatureChart"/>, document.querySelector("#panel"));
React.renderComponent(<Menu/>, document.querySelector("#menu"));
React.renderComponent(<LatestReading/>, document.querySelector("#latest-reading"));
React.renderComponent(<DatetimeSelector/>, document.querySelector("#datetime-selector"));
React.renderComponent(<LastUpdated/>, document.querySelector("#last-updated"));

}