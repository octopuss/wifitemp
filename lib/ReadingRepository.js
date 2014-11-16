var collections = ["sensorReadings"]
var mongoUri = 'mongodb://octopuss:octopuss@lennon.mongohq.com:10020/app24571573';
var db = require("promised-mongo").connect(mongoUri, collections);
var Promise = require('promise');
var ChartConstants = require('./ChartConstants');

var queryResult = {
    nodeNames: [],
    nodeIds: [],
    sensorIds: [],
    minMaxAvgDTO: [],
    readings: []
};


var ReadingRepository = {
    findLatest: function (limit, callback) {
        db.sensorReadings.find().sort({created: -1}).limit(Number(limit)).toArray().then(function (docs) {
            callback(JSON.stringify(docs));
        });
    },
    getReadings: function (criteria) {
        return db.sensorReadings.find(criteria).toArray();
    },
    insertData: function (ip, readings, callback) {
        var rArray = readings.split(";");
        var documents = [];
        var today= Date();
        for (var i = 0; i < rArray; i++) {
            var r = rArray[i].split("|");
            var document = {
                valueDimension: "°C",
                value: r[1],
                readingType: "TEMPERATURE",
                sensorId: r[0],
                nodeName: "Jungmannova 1405",
                nodeId: "jung1405",
                ipAddress: ip,
                day: today.getDate(),
                month: today.getMonth()+1,
                year: today.getYear(),
                hour: today.getHours(),
                minute: today.getMinutes(),
                second: today.getSeconds(),
                created: today.getTime()
            };
            documents.push(document);
        }

        db.sensorReadings.insert(documents, callback);
    },
    getData: function (fromDate, toDate, dataScope, callback) {
        var createdCriteria = this.createdCriteria(fromDate, toDate);
        var nodeNamesPromise = this.findDistinct(createdCriteria, 'nodeName');
        var nodeIdsPromise = this.findDistinct(createdCriteria, 'nodeId');
        var sensorIdsPromise = this.findDistinct(createdCriteria, 'sensorId');
        var minMaxAvgDto = this.getMinMaxAvgDto(fromDate, toDate, dataScope);
        var readings = this.getReadings(createdCriteria);
        if (dataScope != ChartConstants.CHART_TYPE_HOUR) {
            var pArray = [nodeNamesPromise, nodeIdsPromise, sensorIdsPromise, minMaxAvgDto];
        } else {
            var pArray = [nodeNamesPromise, nodeIdsPromise, sensorIdsPromise, minMaxAvgDto, readings];
        }
        Promise.all(pArray).then(function (data) {
            console.log("here");
            queryResult.nodeNames = data[0];
            queryResult.nodeIds = data[1];
            queryResult.sensorIds = data[2];
            queryResult.minMaxAvgDTO = data[3];
            if (dataScope == ChartConstants.CHART_TYPE_HOUR) {
                queryResult.readings = data[4];
            }
            callback(JSON.stringify(queryResult));
        });

    },
    findDistinct: function (criteria, fieldName) {
        return db.sensorReadings.distinct(fieldName, criteria, {});
    },
    createdCriteria: function (fromDate, toDate) {
        return {
            created: {
                $gt: Number(fromDate),
                $lt: Number(toDate)
            }
        };
    },
    getMinMaxAvgDto: function (fromDate, toDate, level) {
        var createdCriteria = this.createdCriteria(fromDate, toDate);
        var id = this.getAggregationId(level);
        var match = {"$match": createdCriteria};
        var group = {
            "$group": {
                "_id": id,
                "min": {"$min": "$value"},
                "avg": {"$avg": "$value"},
                "max": {"$max": "$value"},
                "sum": {"$sum": "$value"},
                "count": {"$sum": 1}
            }
        };
        console.log("{"+JSON.stringify(match)+","+JSON.stringify(group)+"}");
        return db.sensorReadings.aggregate(match, group);
    },
    getAggregationId: function (level) {
        var id = {
            "sensorId": "$sensorId",
            "valueDimension": "$valueDimension"
        };
        switch (level) {
            case ChartConstants.CHART_TYPE_DAY:
                id.hour = "$hour";
                break;
            case ChartConstants.CHART_TYPE_HOUR:
                //id.hour = "$hour";
                break;
            case ChartConstants.CHART_TYPE_MONTH:
                id.day = "$day";
                break;
            case ChartConstants.CHART_TYPE_YEAR:
                id.month = "$month";
                break;
        }
        return id;
    }
};
module.exports = ReadingRepository;