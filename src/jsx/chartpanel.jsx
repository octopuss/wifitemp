var React = require('react');
var Panel = require('react-bootstrap/Panel');
var Chart = require('./chart.js');
var ReadingBlock = require('./readingblock.js');
var ChartConstants = require('../src/js/ChartConstants');


var ChartPanel = React.createClass({
    render:function() {
        return (<Panel header={this.props.title}>
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
