/** @jsx React.DOM */

var React = require('react');
var Panel = require('react-bootstrap/Panel');
var Chart = require('./chart.js');
var ReadingBlock = require('../work/readingblock.js');
var ChartConstants = require('../src/js/ChartConstants');
var ChartEnums = require('../src/js/ChartEnums');
var ChartStore = require('../src/js/ChartStore');
var moment = require('moment');
var Icon = require('react-bootstrap/Glyphicon');



var ChartPanel = React.createClass({
    getInitialState: function(){
        var fromTo = ChartStore.getFromToDates();
        return (fromTo);
    },
    componentDidMount: function() {
        ChartStore.addChangeListener(this.changeHandler);
        this.changeHandler();
    },

    componentWillUnmount: function() {
        ChartStore.removeChangeListener(this.changeHandler);
    },

    changeHandler: function() {
       datetimes = ChartStore.getFromToDates();
       this.setState({
           fromTime:moment(datetimes.fromTime).format(ChartEnums[ChartConstants.MOMENT_DATETIME_FORMAT]),
           toTime:moment(datetimes.toTime).format(ChartEnums[ChartConstants.MOMENT_DATETIME_FORMAT])
       });
    },
    render:function() {
        return (<Panel header={<div><Icon glyph="tasks"/>&nbsp;<span>{this.props.title}&nbsp;<b>{this.state.fromTime}-{this.state.toTime}</b></span></div>}>
            <div className="col-md-10">
                <Chart id={this.props.chartId}/>
            </div>
            <div className="col-md-2">
                <ReadingBlock readingType={ChartConstants.READING_TYPE_MIN}/>
                <ReadingBlock readingType={ChartConstants.READING_TYPE_AVG}/>
                <ReadingBlock readingType={ChartConstants.READING_TYPE_MAX}/>
            </div>
        </Panel>);
    }
});

module.exports = ChartPanel;
