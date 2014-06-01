  fillColors=["rgba(220,220,220,0.5)","rgba(151,187,205,0.5)"];
      strokeColors=["rgba(220,220,220,1)", "rgba(151,187,205,1)"];
      pointColors=["rgba(220,220,220,1)","rgba(151,187,205,1)"];
      function loadData(criteria,callback){
        $.ajax({url:"http://localhost:8080/wifitemp/data",datatype:"jsonp", success:callback})
      }

      chartOptions={};
      chartOptions.datasetFill =false;
      chartOptions.showTooltips=true;
      
      loadData(null,createHourChart);

      function createYearChart(data){
        $("#chartHeader").html("Roční přehled");
        var ctx = $("#temperatureChart").get(0).getContext("2d");
        var chartData = {};
        chartData.labels=["Leden","Únor","Březen","Duben","Květen","Červen","Červenec","Srpen","Září","Říjen","Listopad","Prosinec"];
        chartData.datasets=getDatasets(data,"Y");
        console.log(chartData);
        new Chart(ctx).Line(chartData,chartOptions);
      }

      function createMonthChart(data){
        $("#chartHeader").html("Měsíční přehled");
        var ctx = $("#temperatureChart").get(0).getContext("2d");
        var chartData = {};
        var date = new Date(data[0]._id.time);
        chartData.labels = getDateLabels(date.getMonth(), date.getFullYear());
        chartData.datasets = getDatasets(data, "M");
        console.log(chartData);
        new Chart(ctx).Line(chartData,chartOptions);
        
      }

      function createDayChart(data) {
        $("#chartHeader").html("Denní přehled");
        var ctx = $("#temperatureChart").get(0).getContext("2d");
        var chartData = {};
        chartData.labels = ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"];
        chartData.datasets=getDatasets(data,"D");
        console.log(chartData);
        new Chart(ctx).Line(chartData,chartOptions);        
      }


      function createHourChart(data) {
        $("#chartHeader").html("Hodinový přehled");
        var ctx = $("#temperatureChart").get(0).getContext("2d");
         var chartData = {};
         chartData.labels=["00:00","00:05","00:10","00:15","00:20","00:25","00:30","00:35","00:40","00:45","00:50","00:55"];
         chartData.datasets=getDatasets(data,"H");
         console.log(chartData);
         new Chart(ctx).Line(chartData,chartOptions);
      }

    function getDatasets(data, unit) {
      dataSets=[];
      plotData=[];
        
       
        for(var r in data[0].readings) {
          sensorId=data[0].readings[r].sensorId;
          dataSets[r] = {
              fillColor : fillColors[r],
              strokeColor : strokeColors[r],
              pointColor : pointColors[r],
              pointStrokeColor : "#fff",
              data : getPlotData(data, sensorId, unit)
        }
      }
      return dataSets;
    }

    function getPlotData(data, sensorId, unit) {
      if(unit=="D") {
           return getDayPlotData(data,sensorId);
        }

      if(unit=="M") {
          return getMonthPlotData(data,sensorId);
        }
      if(unit=="H") {
          return getHourPlotData(data,sensorId);
        } 
       if(unit=="Y") {
          return getYearPlotData(data,sensorId);
        }   
    }

    function getYearPlotData(data, sensorId) {
      returnDataSet=[0,0,0,0,0,0,0,0,0,0,0,0];
      for(var i in data) {
        entry = data[i];
        //console.log(entry);
        var date = new Date(entry._id.time);
        var monthIndex = date.getMonth();
        for(var j in entry.readings) {
          reading = entry.readings[j];
          if(reading.sensorId==sensorId) {
            returnDataSet[monthIndex]=reading.temperature.value;
          }
        } 
      }
      return returnDataSet;
    }

    function getMonthPlotData(data, sensorId) {
      var d = new Date(data[0]._id.time);
      nod = getNumberOfDays(d.getFullYear(),d.getMonth());
      returnDataSet =[];
      for (var i = nod - 1; i >= 0; i--) {
        returnDataSet.push(0);
      };
      for(var i in data) {
        entry = data[i];
        var date = new Date(entry._id.time);
        var dayIndex = date.getDate()-1;
        for(var j in entry.readings) {
          reading = entry.readings[j];
          if(reading.sensorId==sensorId) {
            returnDataSet[dayIndex]=reading.temperature.value;
          }
        } 

      }
      return returnDataSet;

    }


    function getDayPlotData(entries,sensorId) {
      returnDataSet=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      for(var i in entries) {
        entry = entries[i];
        //console.log(entry);
        var date = new Date(entry._id.time);
        var hourIndex = date.getHours()-1;
        for(var j in entry.readings) {
          reading = entry.readings[j];
          if(reading.sensorId==sensorId) {
            returnDataSet[hourIndex]=reading.temperature.value;
          }
        } 
      }
      return returnDataSet;
    }

    function getHourPlotData(entries,sensorId){
      returnDataSet=[0,0,0,0,0,0,0,0,0,0,0,0];
      for(var i in entries) {
        entry = entries[i];
        var date = new Date(entry._id.time);
        var minuteIndex=getMinuteIndex(date);
        for(var j in entry.readings) {
          reading = entry.readings[j];
          if(reading.sensorId==sensorId) {
            returnDataSet[minuteIndex]=reading.temperature.value;
          }
        } 
      }
       return returnDataSet;
    }

    function getMinuteIndex(date){
      minute = date.getMinutes();
      return Math.floor(minute/5);
    }

    function getDateLabels(month, year) {
        labels = [];
        days = getDaysInMonth(month,year);
        for(var i in days) {
          day = days[i];
          labels.push(day.getDate()+"."+day.getMonth()+"."+day.getFullYear());
        }
        return labels;
    }

function getNumberOfDays(year, month) {
    var isLeap = ((year % 4) == 0 && ((year % 100) != 0 || (year % 400) == 0));
    return [31, (isLeap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}

    /**
 * @param {int} The month number, 0 based
 * @param {int} The year, not zero based, required to account for leap years
 * @return {Date[]} List with date objects for each day of the month
 */
function getDaysInMonth(month, year) {
     var date = new Date(year, month, 1);
     var days = [];
     while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
     }
     return days;
}
