var AppDispatcher = require('./AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var ChartConstants = require('./ChartConstants');
var ChartEnums = require('./ChartEnums');
var CHANGE_EVENT = 'change';
var moment = require('moment');


var chart = {
    data: {
        fromTime:'',
        toTime:'',
        readings : {}
    },
    meta: {
       datetime:'',
       year:'',
       month:'',
       chartType:ChartConstants.CHART_TYPE_DAY,
       colors:{
          fill: ["rgba(220,220,220,0.5)","rgba(151,187,205,0.5)"],
          stroke :["rgba(220,220,220,1)", "rgba(151,187,205,1)"],
          point : ["rgba(220,220,220,1)","rgba(151,187,205,1)"]
        }

    }
};



function updateDatetime(datetime) {
   chart.meta.datetime = datetime;
   chart.meta.year=datetime.toDate().getFullYear();
   chart.meta.month=datetime.toDate().getMonth()+1;
   setFromDateToDate();
}

function getNumberOfDays() {
    var isLeap = ((chart.meta.year % 4) == 0 && ((chart.meta.year % 100) != 0 || (chart.meta.year % 400) == 0));
    return [31, (isLeap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][chart.meta.month];
}

function setFromDateToDate(){
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
}

function updatePlot(chartType) {
    chart.meta.chartType = chartType;
}

var ChartStore = merge(EventEmitter.prototype, {

    setup: function(data){
        chart.data.lastUpdated=data.lastUpdated;
        updateDatetime(moment(new Date()));
        this.emitChange();
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    getFromToDates: function(){
        return {fromTime:chart.data.fromTime,toTime:chart.data.toTime};
    },
    getDateLabels: function() {
    var labels = [];
    var days = this.getDaysInMonth();
    for( i=0;i<days.length;i++) {
        var day = days[i];
        labels.push(day.getDate()+"."+day.getMonth()+"."+day.getFullYear());
    }
    chart.meta.labels=labels;
    },

    getDaysInMonth: function() {
    var date = new Date(chart.meta.year, chart.meta.month, 1);
    var days = [];
    while (date.getMonth() === chart.meta.month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
    },

    getCurrentChartType:function () {
        //console.log("current char type = " + chart.meta.chartType)
        return chart.meta.chartType;
    },
    getLastUpdated:function(){
       return chart.data.lastUpdated;
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherIndex: AppDispatcher.register(function(payload) {
        var action = payload.action;
        console.log("Performed action-->");
        console.log(action);
        switch(action.actionType) {

            case ChartConstants.CHART_UPDATE_PLOT:
                updatePlot(action.chartType);
                setFromDateToDate();
                ChartStore.emitChange();
                console.log(chart);
                break;
            case ChartConstants.CHART_UPDATE_DATETIME:
                updateDatetime(action.datetime);
                setFromDateToDate();
                ChartStore.emitChange();

                break;

            // add more cases for other actionTypes, like TODO_UPDATE, etc.
        }

        return true; // No errors. Needed by promise in Dispatcher.
    })

});

module.exports = ChartStore;