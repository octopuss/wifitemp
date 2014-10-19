/** @jsx React.DOM */

var React = require('react');
var Alert = require('react-bootstrap/Alert');
var ChartConstants = require('../src/js/ChartConstants');
var ChartEnums = require('../src/js/ChartEnums');
var ChartStore = require('../src/js/ChartStore');

var ReadingBlock = React.createClass({

    getInitialState:function(){
       return {readingValue:0, readingDimension:ChartEnums[ChartConstants.READING_DIMENSION_CELSIUS]};
    },

    componentDidMount: function() {
        ChartStore.addChangeListener(this.changeHandler);
        ChartStore.addPendingListener(this.togglePendingState);
        ChartStore.addDoneListener(this.togglePendingState);
        ChartStore.addLoadListener(this.changeHandler);
    },

    componentWillUnmount: function() {
        ChartStore.removeChangeListener(this.changeHandler);
        ChartStore.removePendingListener(this.togglePendingState);
        ChartStore.removeDoneListener(this.togglePendingState);
        ChartStore.removeLoadListener(this.changeHandler);
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