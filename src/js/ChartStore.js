var AppDispatcher = require('./AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var ChartConstants = require('./ChartConstants');
var ChartEnums = require('./ChartEnums');
var ChartActions= require('./ChartActions');
var Data= require('./DataManipulation');
var CHANGE_EVENT = 'change';
var LOAD_EVENT = 'load';
var PENDING_EVENT = 'pending';
var LOADING_DONE_EVENT='loading-done';

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
            console.log(res);
            chart.data.latestReading=res[0];
            chart.data.readings=res[1].readings;
            chart.data.minMaxAvgDTO=res[1].minMaxAvgDTO;
            chart.data.minMaxAvg=ChartActions.getMinMaxAvg(chart);
            console.log(chart);
            ChartStore.emitLoad();


         });
    },
    processDataUpdate:function(res){
        chart.data.latestReading=res;
        chart.data.readings=res.readings;
        chart.data.minMaxAvgDTO=res.minMaxAvgDTO;
        chart.data.minMaxAvg=ChartActions.getMinMaxAvg(chart);
        ChartStore.emitLoadingDone();
    },
    emitChange: function() {
        console.log("Changed...");
        this.emit(CHANGE_EVENT);
    },
    emitLoad: function() {
        console.log("Loaded...");
        this.emit(LOAD_EVENT);
    },
    emitLoadingDone: function() {
        this.emit(LOADING_DONE_EVENT);
    },
    emitPending: function() {
        this.emit(PENDING_EVENT);
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

    /**
     * @param {function} callback
     */
    addLoadListener: function(callback) {
        this.on(LOAD_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeLoadListener: function(callback) {
        this.removeListener(LOAD_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    addPendingListener: function(callback) {
        this.on(PENDING_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removePendingListener: function(callback) {
        this.removeListener(PENDING_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    addDoneListener: function(callback) {
        this.on(LOADING_DONE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeDoneListener: function(callback) {
        this.removeListener(LOADING_DONE_EVENT, callback);
    },


    dispatcherIndex: AppDispatcher.register(function(payload) {
        var action = payload.action;
        console.log("Performed action-->");
        console.log(action);
        switch(action.actionType) {

            case ChartConstants.CHART_UPDATE_PLOT:

                ChartActions.chartUpdatePlot(action,chart);
                ChartStore.emitPending();
               // setTimeout(function(){console.log("finished pending");ChartStore.emitLoadingDone();},5000);
                var dPromise = Data.getChartData(chart);
                Promise.resolve(dPromise).then(ChartStore.processDataUpdate);
                break;
            case ChartConstants.CHART_UPDATE_DATETIME:
                ChartActions.updateDatetime(action.datetime,chart);
                ChartActions.setFromDateToDate(chart);
                ChartStore.emitPending();
                // setTimeout(function(){console.log("finished pending");ChartStore.emitLoadingDone();},5000);
                var dPromise = Data.getChartData(chart);
                Promise.resolve(dPromise).then(ChartStore.processDataUpdate);
                break;
        }
        ChartStore.emitChange();
        return true; // No errors. Needed by promise in Dispatcher.
    })

});

module.exports = ChartStore;