var AppDispatcher = require('./AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var ChartConstants = require('./ChartConstants');

var CHANGE_EVENT = 'change';
var _readings = {};

var loadChartData = function (){

}

var ChartStore = merge(EventEmitter.prototype, {
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    }
});

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case ChartConstants.CHART_UPDATE_PLOT:
            loadChartData();
        break;
        default:
            return true;
    };

    ChartStore.emitChange();

    return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = ChartStore;