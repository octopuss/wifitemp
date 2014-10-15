var AppDispatcher = require('./AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var ChartConstants = require('./ChartConstants');
var ChartEnums = require('./ChartEnums');
var ChartActions= require('./ChartActions');
var Data= require('./DataManipulation');
var CHANGE_EVENT = 'change';



var chart = {
    data: {
        fromTime:'',
        toTime:'',
        latestReading:'',
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


var ChartStore = merge(EventEmitter.prototype, {

    setup: function(data){
        chart.data.lastUpdated=data.lastUpdated;
        ChartActions.updateDatetime(new Date(),chart);
        ChartActions.setLatestReading(Data.getLatestReading(),chart);
        this.emitChange();
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    getFromToDates: function(){
        return {fromTime:chart.data.fromTime,toTime:chart.data.toTime};
    },
    getCurrentChartType:function () {
        //console.log("current char type = " + chart.meta.chartType)
        return chart.meta.chartType;
    },
    getLatestReading:function(){
       Data.getLatestReading();
       return chart.data.latestReading;
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

    chartUpdatePlot:function(action){
        ChartActions.updatePlot(action.chartType,chart);
        ChartActions.setFromDateToDate(chart);
        this.emitChange();
        console.log(chart);
    },

    dispatcherIndex: AppDispatcher.register(function(payload) {
        var action = payload.action;
        console.log("Performed action-->");
        console.log(action);
        switch(action.actionType) {

            case ChartConstants.CHART_UPDATE_PLOT:
                this.chartUpdatePlot(action);
                break;
            case ChartConstants.CHART_UPDATE_DATETIME:
                ChartActions.updateDatetime(action.datetime,chart);
                ChartActions.setFromDateToDate(chart);
                this.emitChange();

                break;

            // add more cases for other actionTypes, like TODO_UPDATE, etc.
        }

        return true; // No errors. Needed by promise in Dispatcher.
    })

});

module.exports = ChartStore;