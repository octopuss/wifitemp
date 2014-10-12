var React = require('react');
var Alert = require('react-bootstrap/Alert');
var ChartConstants = require('../src/js/ChartConstants');

var ReadingBlock = React.createClass({

    getInitialState:function(){
       return {readingValue:0, readingDimension:"°C"};
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
            {this.state.readingValue}{this.state.readingDimension}
            </Alert>
            )
    }
});

module.exports = ReadingBlock;