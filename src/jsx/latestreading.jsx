/** @jsx React.DOM */

var React = require('react');
var Alert = require('react-bootstrap/Alert');
var ChartConstants = require('../src/js/ChartConstants');
var ChartEnums = require('../src/js/ChartEnums');
var ChartStore = require('../src/js/ChartStore');

var LatestReading = React.createClass({

    getInitialState:function(){
        return {readingValue:0, readingDimension:ChartEnums[ChartConstants.READING_DIMENSION_CELSIUS]};
    },
    componentDidMount: function() {
        ChartStore.addChangeListener(this.changeHandler);
    },

    componentWillUnmount: function() {
        ChartStore.removeChangeListener(this.changeHandler);
    },

    changeHandler: function() {
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