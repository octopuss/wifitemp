var collections = ["sensorReadings"]
var mongoUri  = '';
var db = require("promised-mongo").connect(mongoUri, collections);
var Promise = require('promise');

var queryResult = {
    nodeNames:[],
    nodeIds:[],
    sensorIds:[],
    minMaxAvgDTO:[]
};



var ReadingRepository= {
    findLatest: function (limit, callback) {
        db.sensorReadings.find().sort({ created: -1}).limit(Number(limit)).toArray().then(function(docs) {
            callback(JSON.stringify(docs));
        });
    },
    getData: function(fromDate,toDate,dataScope, callback) {
       this.setDistinctValues(fromDate,toDate,callback);
    },
    findDistinct: function (criteria, fieldName, callback) {
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
    setDistinctValues:function(fromDate,toDate, callback) {

        var createdCriteria = this.createdCriteria(fromDate,toDate);
        Promise.all([this.findDistinct(createdCriteria,'nodeName'),
            this.findDistinct(createdCriteria,'nodeId'),
            this.findDistinct(createdCriteria,'sensorId')]).then(function(data){
            queryResult.nodeNames=data[0];
            queryResult.nodeIds=data[1];
            queryResult.sensorIds=data[2];
            callback(queryResult);
        });


    },
    getMinMaxAvgDto: function(criteria, level){
        db.sensorReadings.aggregate({$group})
    }
};
module.exports=ReadingRepository;