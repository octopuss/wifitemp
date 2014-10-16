/** @jsx React.DOM */

var React = require('react');
var Alert = require('react-bootstrap/Alert');
var ChartConstants = require('../src/js/ChartConstants');
var ChartEnums = require('../src/js/ChartEnums');
var ChartStore = require('../src/js/ChartStore');

var LatestReading = React.createClass({

    getInitialState:function(){
        var lr = ChartStore.getLatestReading();
        return {readingValue:lr.value, readingDimension:ChartEnums[lr.valueDimension]};
    },
    componentDidMount: function() {
        ChartStore.addLoadListener(this.changeHandler);
    },

    componentWillUnmount: function() {
        ChartStore.removeLoadListener(this.changeHandler);
    },

    changeHandler: function() {
        console.log("change detected");
        var lr  =ChartStore.getLatestReading()[0];
        this.setState({readingValue:lr.value, readingDimension:ChartEnums[lr.valueDimension]});
    },

    render: function(){
        return(<Alert bsStyle="warning">
            <strong>Aktuální teplota</strong>
            <h2>{this.state.readingValue}{this.state.readingDimension}</h2>
        </Alert>
        );
    }
})

module.exports = LatestReading;