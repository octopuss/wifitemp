var AppDispatcher = require('./AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var ChartConstants = require('./ChartConstants');


var CHANGE_EVENT = 'change';

var _readings = {}; // collection of server data

var _currentChartType = ChartConstants.CHART_TYPE_DAY;

function updatePlot(chartType) {
    _currentChartType = chartType;
    console.log(chartType);
}

var ChartStore = merge(EventEmitter.prototype, {


    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    getCurrentChartType:function () {
        return _currentChartType;
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

        switch(action.actionType) {

            case ChartConstants.CHART_UPDATE_PLOT:
                updatePlot(action.chartType);
                ChartStore.emitChange();
                break;

            // add more cases for other actionTypes, like TODO_UPDATE, etc.
        }

        return true; // No errors. Needed by promise in Dispatcher.
    })

});

module.exports = ChartStore;