var Jquery = require('jquery');
var Promise = require('promise');
var ChartConstants = require('./ChartConstants');
var ChartEnums = require('./ChartEnums');

var DataManipulation = {
    getLatestReading:function(){
    qs = {};
    qs.limit=ChartEnums[ChartConstants.CHART_SENSOR_COUNT];
    var jqPromise = Jquery.ajax({url:ChartEnums[ChartConstants.CHART_DATA_URL]+"/latest",data:qs,datatype:"jsonp"});
    var promise =  Promise.resolve(jqPromise);
    return promise;
    }
};

module.exports = DataManipulation;

