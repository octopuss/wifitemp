var ChartConstants = require('./ChartConstants');
var ChartEnums = require('./ChartEnums');
var moment = require('moment');


Array.prototype.getUnique = function(){
    var u = {}, a = [];
    for(var i = 0, l = this.length; i < l; ++i){
        if(u.hasOwnProperty(this[i])) {
            continue;
        }
        a.push(this[i]);
        u[this[i]] = 1;
    }
    return a;
}


var ChartActions = {

    updateDatetime:function (datetime,chart) {
        chart.meta.datetime = moment(datetime);
        chart.meta.year=chart.meta.datetime.toDate().getFullYear();
        chart.meta.month=chart.meta.datetime.toDate().getMonth()+1;
        this.setFromDateToDate(chart);
    },
    chartUpdatePlot:function(action,chart){
        this.updatePlot(action.chartType,chart);
        this.setFromDateToDate(chart);
        console.log(chart);
    },
    assemblyChartData:function(chart){
        var data = {};
        data.datasets=[];
        data.labels = this.getLabels(chart);
        var dataset = {};
        dataset.strokeColor=chart.meta.colors.stroke;
        dataset.pointColor=chart.meta.colors.point;
        dataset.fillColor=chart.meta.colors.fill;
        dataset.data=this.getPlotData(chart,"temp01");
        data.datasets[0]=dataset;
        return data;
    },
    getMinuteIndex:function(minute){
    return Math.floor(minute/5);
    },
    getNumberOfDays:function(chart) {
    var isLeap = ((chart.meta.year % 4) == 0 && ((chart.meta.year % 100) != 0 || (chart.meta.year % 400) == 0));
    return [31, (isLeap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][chart.meta.month];
    },
    setFromDateToDate:function (chart){
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
                toDate.setDate(this.getNumberOfDays(chart));
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
    },
    updatePlot:function (chartType, chart) {
        chart.meta.chartType = chartType;
        chart.ui=this.assemblyChartData(chart);
    },

    getDaysInMonth: function(chart) {
        var date = new Date(chart.meta.year, chart.meta.month, 1);
        var days = [];
        while (date.getMonth() === chart.meta.month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    },
    getDateLabels: function(chart) {
        var labels = [];
        var days = this.getDaysInMonth(chart);
        for( i=0;i<days.length;i++) {
            var day = days[i];
            labels.push(day.getDate()+"."+day.getMonth()+"."+day.getFullYear());
        }
        return labels;
    },

    getDayPlotData: function(chart, sensorId) {
        var returnDataSet=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var entries = chart.data.minMaxAvgDTO;
        for(var i=0;i<entries.length;i++) {
           var entry = entries[i];

            if(entry.sensorId==sensorId) {
                returnDataSet[entry.hour]=entry.avg;
            }
        }
        return returnDataSet;
    },
    getHourPlotData: function(chart,sensorId){
        var returnDataSet=[0,0,0,0,0,0,0,0,0,0,0,0];
        var entries = chart.data.readings;
        for(var i=0;i<entries.length;i++) {
            var entry = entries[i];
            var minuteIndex=this.getMinuteIndex(entry.minute);
            if(entry.sensorId==sensorId) {
                returnDataSet[minuteIndex]=entry.value;
            }
        }
        return returnDataSet;
    },
    getMonthPlotData: function(chart, sensorId) {
        var nod = this.getNumberOfDays(chart);
        var returnDataSet =[];
        for (var i = nod - 1; i >= 0; i--) {
            returnDataSet.push(0);
        };
        entries = chart.data.minMaxAvgDTO;
        for(i=0;i<entries.length;i++) {
            entry = entries[i];
            if(entry.sensorId==sensorId) {
                returnDataSet[entry.day-1]=entry.avg;
            }
        }
        return returnDataSet;

    },
    getYearPlotData: function(chart, sensorId) {
        var returnDataSet=[0,0,0,0,0,0,0,0,0,0,0,0];
        var entries = chart.data.minMaxAvgDTO;
        for(i=0;i<entries.length;i++) {
            var entry = entries[i];
            if(entry.sensorId==sensorId) {
                returnDataSet[entry.month-1]=entry.avg;
            }
        }
        return returnDataSet;
    },

    getMinMaxAvg: function(chart){
        if(chart.data.minMaxAvgDTO.length!=0) {
            var sensorIds = [];
            for (i = 0; i < chart.data.minMaxAvgDTO.length; i++) {
                sensorIds.push(chart.data.minMaxAvgDTO[i].sensorId);

            }
            sensorIds = sensorIds.getUnique();

            for (j = 0; j < sensorIds.length; j++) {
                var min = 100;
                var max = -100;
                var avg = 0;
                var sum = 0;
                var count = 0;
                for (var k = 0; k < chart.data.minMaxAvgDTO.length; k++) {
                    var dto = chart.data.minMaxAvgDTO[k];
                    if (dto.sensorId == sensorIds[j]) {
                        if (min > dto.min) min = dto.min;
                        if (max < dto.max) max = dto.max;
                        count++;
                        sum += dto.avg;

                    }
                }
                avg = sum / count;

                var dout = {};
                dout[ChartConstants.READING_TYPE_MIN] = Math.round(min * 100) / 100;
                dout[ChartConstants.READING_TYPE_MAX] = Math.round(max * 100) / 100;
                dout[ChartConstants.READING_TYPE_AVG] = Math.round(avg * 100) / 100;

                return dout;
            }
        }
    },
    getLabels: function(chart){
        switch(chart.meta.chartType) {
            case(ChartConstants.CHART_TYPE_HOUR):
                return ["00:00","00:05","00:10","00:15","00:20","00:25","00:30","00:35","00:40","00:45","00:50","00:55"];
            case(ChartConstants.CHART_TYPE_DAY):
                return ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"];
            case(ChartConstants.CHART_TYPE_MONTH):
                return this.getDateLabels(chart);
            case(ChartConstants.CHART_TYPE_YEAR):
                return ["Leden","Únor","Březen","Duben","Květen","Červen","Červenec","Srpen","Září","Říjen","Listopad","Prosinec"];

        }
    },
    getPlotData: function(chart, sensorId){
        switch(chart.meta.chartType) {
            case(ChartConstants.CHART_TYPE_HOUR):
                return this.getHourPlotData(chart,sensorId);
            case(ChartConstants.CHART_TYPE_DAY):
                return this.getDayPlotData(chart,sensorId);
            case(ChartConstants.CHART_TYPE_MONTH):
                return this.getMonthPlotData(chart,sensorId);
            case(ChartConstants.CHART_TYPE_YEAR):
                return this.getYearPlotData(chart,"temp01");

        }
    }
};

module.exports = ChartActions;