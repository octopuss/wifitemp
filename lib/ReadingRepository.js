var collections = ["sensorReadings"]
var mongoUri  = 'mongodb://octopuss:octopuss@lennon.mongohq.com:10020/app24571573';
var db = require("promised-mongo").connect(mongoUri, collections);
var Promise = require('promise');
var ChartConstants = require('./ChartConstants');

var queryResult = {
    nodeNames:[],
    nodeIds:[],
    sensorIds:[],
    minMaxAvgDTO:[],
    readings:[]
};



var ReadingRepository= {
    findLatest: function (limit, callback) {
        db.sensorReadings.find().sort({ created: -1}).limit(Number(limit)).toArray().then(function(docs) {
            callback(JSON.stringify(docs));
        });
    },
    getReadings: function(criteria) {
       return db.sensorReadings.find(criteria).toArray();
    },
    getData: function(fromDate,toDate,dataScope, callback) {
       var createdCriteria = this.createdCriteria(fromDate,toDate);
       var nodeNamesPromise = this.findDistinct(createdCriteria,'nodeName');
       var nodeIdsPromise = this.findDistinct(createdCriteria,'nodeId');
       var sensorIdsPromise =  this.findDistinct(createdCriteria,'sensorId');
       var minMaxAvgDto = this.getMinMaxAvgDto(fromDate,toDate,dataScope);
       var readings = this.getReadings(createdCriteria);
        if(dataScope==ChartConstants.CHART_TYPE_HOUR) {
            var pArray = [nodeNamesPromise, nodeIdsPromise, sensorIdsPromise, minMaxAvgDto];
        } else {
            var pArray = [nodeNamesPromise, nodeIdsPromise, sensorIdsPromise, minMaxAvgDto, readings];
        }
       Promise.all(pArray).then(function(data) {
           console.log("here");
           queryResult.nodeNames = data[0];
           queryResult.nodeIds = data[1];
           queryResult.sensorIds = data[2];
           queryResult.minMaxAvgDTO = data[3];
           if(dataScope==ChartConstants.CHART_TYPE_HOUR) {
           queryResult.readings = data[4];
           }
           callback(JSON.stringify(queryResult));
       });

    },
    findDistinct: function (criteria, fieldName) {
        console.log("finding distinct")
       return db.sensorReadings.distinct(fieldName,criteria, {});
    },
    createdCriteria: function(fromDate,toDate){
        return  {
            created:{
                $gt:Number(fromDate),
                $lt:Number(toDate)
            }
        };
    },
    getMinMaxAvgDto: function(fromDate,toDate, level){
        console.log("in minmaxavgdto");
        var createdCriteria = this.createdCriteria(fromDate,toDate);
       var id = this.getAggregationId(level);
       var match = {"$match":createdCriteria};
       var group = {"$group": {
               "_id": id,
               "min": {"$min": "$value"},
               "avg": {"$avg": "$value"},
               "max": {"$max": "$value"},
               "sum": {"$sum": "$value"},
               "count": {"$sum": 1}
           }
       };
       return db.sensorReadings.aggregate(match,group);
    },
    getAggregationId: function (level) {
        var id = {
            "sensorId":"$sensorId",
            "valueDimension":"$valueDimension"
        }
        switch(level){
            case ChartConstants.CHART_TYPE_DAY:
                id.hour = "$hour";
                break;
            case ChartConstants.CHART_TYPE_HOUR:
                //id.hour = "$hour";
                break;
            case ChartConstants.CHART_TYPE_MONTH:
                id.day="$day";
                break;
            case ChartConstants.CHART_TYPE_YEAR:
                id.month="$month";
                break;
        }
        return id;
    }
};
module.exports=ReadingRepository;