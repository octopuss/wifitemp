var ChartConstants = require('./ChartConstants');
var ChartEnums = require('./ChartEnums');
var moment = require('moment');

var ChartActions = {
    updateDatetime:function (datetime,chart) {
    chart.meta.datetime = moment(datetime);
    chart.meta.year=chart.meta.datetime.toDate().getFullYear();
    chart.meta.month=chart.meta.datetime.toDate().getMonth()+1;
    this.setFromDateToDate(chart);
    },
    setLatestReading:function(promise, chart) {
        promise.then(function(payload){
            chart.data.latestReading=payload;
        },function(err) {console.log(err.statusText)});
    },
    getNumberOfDays:function(chart) {
    var isLeap = ((chart.meta.year % 4) == 0 && ((chart.meta.year % 100) != 0 || (chart.meta.year % 400) == 0));
    return [31, (isLeap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][chart.meta.month];
    },
    setFromDateToDate:function (chart){
        switch(chart.meta.chartType) {
            case ChartConstants.CHART_TYPE_HOUR:
                var fromDate = new Date(chart.meta.datetime);
                fromDate.setHours(fromDate.getHours(),0,0,0);
                var toDate = new Date(chart.meta.datetime);
                toDate.setHours(toDate.getHours(),59,59,0);
                break;
            case ChartConstants.CHART_TYPE_DAY:
                fromDate = new Date(chart.meta.datetime);
                fromDate.setDate(fromDate.getDate());
                fromDate.setHours(0,0,0,0);
                toDate = new Date(chart.meta.datetime);
                toDate.setDate(toDate.getDate());
                toDate.setHours(23,59,59,0);

                break;
            case ChartConstants.CHART_TYPE_MONTH:
                fromDate = new Date(chart.meta.datetime);
                fromDate.setHours(0,0,0,0);
                fromDate.setDate(1);
                toDate = new Date(chart.meta.datetime);
                toDate.setHours(23,59,59,0);
                toDate.setDate(getNumberOfDays());
                break;
            case ChartConstants.CHART_TYPE_YEAR:
                fromDate = new Date(chart.meta.datetime);
                fromDate.setHours(0,0,0,0);
                fromDate.setDate(1);
                fromDate.setMonth(0);
                toDate = new Date(chart.meta.datetime);
                toDate.setHours(23,59,59,0);
                toDate.setDate(31);
                toDate.setMonth(11);
                toDate.setYear(Number(chart.meta.year));
                break;
        }
        chart.data.fromTime=moment(fromDate);
        chart.data.toTime=moment(toDate);
    },
    updatePlot:function (chartType, chart) {
        chart.meta.chartType = chartType;
    },
    getDaysInMonth: function(chart) {
        var date = new Date(chart.meta.year, chart.meta.month, 1);
        var days = [];
        while (date.getMonth() === chart.meta.month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    },
    getDateLabels: function(chart) {
        var labels = [];
        var days = this.getDaysInMonth();
        for( i=0;i<days.length;i++) {
            var day = days[i];
            labels.push(day.getDate()+"."+day.getMonth()+"."+day.getFullYear());
        }
        chart.meta.labels=labels;
    }

};

module.exports = ChartActions;