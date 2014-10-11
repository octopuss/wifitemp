/** @jsx React.DOM */

var React = require('react');
var Panel = require('react-bootstrap/Panel');
var Chart = require('./chart.js');
var Menu = require('./menu.js');
var Icon = require('react-bootstrap/Glyphicon');


var ChartPanel = React.createClass({
    render:function() {
        return (<Panel header={this.props.title}>
                <Chart id={this.props.chartId}/>
        </Panel>);
    }
})

React.renderComponent(<ChartPanel title="Přehled za období" chartId="temperatureChart"/>, document.querySelector("#panel"));
React.renderComponent(<Menu/>, document.querySelector("#menu"));