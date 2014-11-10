/** @jsx React.DOM */
/*
Readingblock module
 */
var React = require('react');
var Alert = require('react-bootstrap/Alert');
var ChartConstants = require('../lib/ChartConstants');
var ChartEnums = require('../lib/ChartEnums');
var ChartStore = require('../lib/ChartStore');

var ReadingBlock = React.createClass({

    getInitialState:function(){
       return {readingValue:0, readingDimension:ChartEnums[ChartConstants.READING_DIMENSION_CELSIUS]};
    },

    componentDidMount: function() {
        ChartStore.addListener(ChartConstants.CHANGE_EVENT,this.changeHandler);
        ChartStore.addListener(ChartConstants.PENDING_EVENT,this.togglePendingState);
        ChartStore.addListener(ChartConstants.LOADING_DONE_EVENT,this.togglePendingState);
        ChartStore.addListener(ChartConstants.LOAD_EVENT,this.changeHandler);
    },

    componentWillUnmount: function() {
        ChartStore.removeListener(ChartConstants.CHANGE_EVENT,this.changeHandler);
        ChartStore.removeListener(ChartConstants.PENDING_EVENT,this.togglePendingState);
        ChartStore.removeListener(ChartConstants.LOADING_DONE_EVENT,this.togglePendingState);
        ChartStore.removeListener(ChartConstants.LOAD_EVENT,this.changeHandler);
    },

    togglePendingState:function(){
        this.setState({pending:!this.state.pending});
    },

    changeHandler: function() {
        this.setState({readingValue:ChartStore.getMinMaxAvg(this.props.readingType)});
    },

    mapReadingSpecificProps: function(){
        switch(this.props.readingType) {
            case ChartConstants.READING_TYPE_AVG:
                return {style:"warning", text:"Průměrná teplota"};
            case ChartConstants.READING_TYPE_MIN:
                return {style:"info", text:"Nejnižší teplota"};
            case ChartConstants.READING_TYPE_MAX:
                return {style:"danger", text:"Nejvyšší teplota"};

        }
    },
    render: function() {
        var readingSpecificProps = this.mapReadingSpecificProps();
        return(
            <Alert bsStyle={readingSpecificProps.style}>
                {readingSpecificProps.text}<br/>
           {'\u00A0'}{!this.state.pending ? this.state.readingValue+this.state.readingDimension : <i className="fa fa-spinner fa-spin pull-left"/>}
            </Alert>
            )
    }
});

module.exports = ReadingBlock;