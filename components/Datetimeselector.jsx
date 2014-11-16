/** @jsx React.DOM */
/*
 DatetimeSelector module
 */
var React = require('react');
var jQuery = require('jquery');
var moment = require('moment');
var AppDispatcher = require('../lib/AppDispatcher');
var ChartConstants = require('../lib/ChartConstants');
var ChartEnums = require('../lib/ChartEnums');


Date.parseDate = function (input, format) {
    return moment(input, format).toDate();
};
Date.prototype.dateFormat = function (format) {
    return moment(this).format(format);
};

var DatetimeSelector = React.createClass({
    getInitialState: function () {
        return {
            datetime: moment(new Date()),
            options: {
                format: ChartEnums[ChartConstants.MOMENT_DATETIME_FORMAT],
                formatTime: ChartEnums[ChartConstants.DATEPICKER_TIME_FORMAT],
                formatDate: ChartEnums[ChartConstants.DATEPICKER_DATE_FORMAT],
                lang: ChartEnums[ChartConstants.DATEPICKER_LANGUAGE],
                dayOfWeekStart: ChartEnums[ChartConstants.DATEPICKER_FIRST_DAY],
                onChangeDateTime: this.onInputChange
            }
        }
    },
    componentDidMount: function () {
        console.log(this.state.options);
        require('../bower_components/datetimepicker/jquery.datetimepicker.js');
        jQuery(this.refs.datetimefield.getDOMNode()).datetimepicker(this.state.options);
    },
    onInputChange: function (e) {
        var m = moment(e);
        if (m.toString() != this.state.datetime.toString()) { //only if datetime really changed
            var out = this.state.datetime;
            out += "->";
            this.setState({datetime: m});
            out += this.state.datetime;
            console.log(out);
            AppDispatcher.handleViewAction({
                actionType: ChartConstants.CHART_UPDATE_DATETIME,
                datetime: this.state.datetime
            })
        }
    },

    formatDatetime: function (val) {
        return moment(val).format(ChartEnums[ChartConstants.MOMENT_DATETIME_FORMAT]);
    },

    render: function () {
        return (<div>
            <label htmlFor="datetimefield">Datum</label>
            <input ref="datetimefield" name="datetimefield" value={this.formatDatetime(this.state.datetime)} readOnly/>
        </div>);
    }
});

module.exports = DatetimeSelector;