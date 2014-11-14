var AppDispatcher = require('./AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var ChartConstants = require('./ChartConstants');
var ChartEnums = require('./ChartEnums');
var ChartActions= require('./ChartActions');
var Data= require('./DataManipulation');

var chart = {
    data: {
        fromTime:'',
        toTime:'',
        latestReading:[],
        readings : [],
        minMaxAvg:{},
        minMaxAvgDTO:[]
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

    },
    ui:{}
};


var ChartStore = merge(EventEmitter.prototype, {

    setup: function(data){
        chart.data.lastUpdated=data.lastUpdated;
        ChartActions.updateDatetime(new Date(),chart);
        var lrPromise = Data.getLatestReading();
        var dPromise = Data.getChartData(chart);
        Promise.all([lrPromise,dPromise]).then(
            function(res){
            console.log("res ole");
            res[0]=JSON.parse(res[0]);
                console.log(res[0]);
            chart.data.latestReading=res[0];
            res[1]=JSON.parse(res[1]);
                console.log(res[1]);
            chart.data.readings=res[1].readings;
            chart.data.minMaxAvgDTO=res[1].minMaxAvgDTO;
            chart.data.minMaxAvg=ChartActions.getMinMaxAvg(chart);
            console.log("chart ole");
            console.log(chart);
            ChartStore.emitEvent(ChartConstants.LOAD_EVENT);


         });
    },
    processDataUpdate:function(res){
        res = JSON.parse(res);
        chart.data.latestReading=res;
        chart.data.readings=res.readings;
        chart.data.minMaxAvgDTO=res.minMaxAvgDTO;
        chart.data.minMaxAvg=ChartActions.getMinMaxAvg(chart);
        ChartStore.emitEvent(ChartConstants.LOADING_DONE_EVENT);
    },
    emitEvent: function(event) {
        console.log("Emiting event -"+event);
        this.emit(event);
    },
    getMinMaxAvg:function(aggregation) {
            return chart.data.minMaxAvg[aggregation];
    },
    getFromToDates: function(){
        return {fromTime:chart.data.fromTime,toTime:chart.data.toTime};
    },
    getCurrentChartType:function () {
        //console.log("current char type = " + chart.meta.chartType)
        return chart.meta.chartType;
    },
    getLatestReading:function(){
       return chart.data.latestReading;
    },
    getLastUpdated:function(){
       return chart.data.lastUpdated;
    },
    getUi:function(){
        return ChartActions.assemblyChartData(chart);
    },


    addListener: function(event, callback) {
        this.on(event, callback);
    },

    removeListener: function(event, callback) {
        this.removeListener(event, callback);
    },

    dispatcherIndex: AppDispatcher.register(function(payload) {
        var action = payload.action;
        console.log("Performed action-->");
        console.log(action);
        switch(action.actionType) {

            case ChartConstants.CHART_UPDATE_PLOT:

                ChartActions.chartUpdatePlot(action,chart);
                ChartStore.emitEvent(ChartConstants.PENDING_EVENT);
                var dPromise = Data.getChartData(chart);
                Promise.resolve(dPromise).then(ChartStore.processDataUpdate);
                break;
            case ChartConstants.CHART_UPDATE_DATETIME:
                ChartActions.updateDatetime(action.datetime,chart);
                ChartActions.setFromDateToDate(chart);
                ChartStore.emitEvent(ChartConstants.PENDING_EVENT);
                var dPromise = Data.getChartData(chart);
                Promise.resolve(dPromise).then(ChartStore.processDataUpdate);
                break;
        }
        ChartStore.emitEvent(ChartConstants.CHANGE_EVENT);
        return true; // No errors. Needed by promise in Dispatcher.
    })

});

module.exports = ChartStore;