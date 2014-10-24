/** @jsx React.DOM */
/*
Latest reading module
 */
var React = require('react');
var Alert = require('react-bootstrap/Alert');
var ChartConstants = require('../lib/ChartConstants');
var ChartEnums = require('../lib/ChartEnums');
var ChartStore = require('../lib/ChartStore');

var LatestReading = React.createClass({

    getInitialState:function(){
        //var lr = ChartStore.getLatestReading();
        return {readingValue:0, readingDimension:ChartEnums[ChartConstants.READING_DIMENSION_CELSIUS], pending:false};
    },
    componentDidMount: function() {
        ChartStore.addLoadListener(this.changeHandler);

    },

    componentWillUnmount: function() {
        ChartStore.removeLoadListener(this.changeHandler);

    },
    changeHandler: function() {
        var lr  =ChartStore.getLatestReading()[0];
        this.setState({readingValue:lr.value, readingDimension:lr.valueDimension});
        console.log(lr.value);
    },

    render: function(){
        return(<Alert bsStyle="warning">
            <strong>Aktuální teplota</strong>
            <h2>{this.state.readingValue}{this.state.readingDimension}
             </h2>
        </Alert>
        );
    }
})

module.exports = LatestReading;