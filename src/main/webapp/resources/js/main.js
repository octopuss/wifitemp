 
//init variables;
	fillColors=["rgba(220,220,220,0.5)","rgba(151,187,205,0.5)"];
  strokeColors=["rgba(220,220,220,1)", "rgba(151,187,205,1)"];
  pointColors=["rgba(220,220,220,1)","rgba(151,187,205,1)"];
  chartOptions={};
  filters={};
  qs={};
  chartOptions.datasetFill =false;
  chartOptions.showTooltips=true;
  dataUpdatedCallbacks=$.Callbacks();
  
  chartType='D';
  sourceData={};
  chartData={};
  
  $(document).ready(init);
  
  
  function init(){
	  setDefaults();
	  setupCallbacks();
	  addCriteria();
	  loadData();	
	  $("#datetime").change(function(){
		  addCriteria();
		  loadData();
	  })
  }
  
  function setupCallbacks(){
	  dataUpdatedCallbacks.add(applyDataFilters);
	  dataUpdatedCallbacks.add(refreshChart);
	  dataUpdatedCallbacks.add(refreshMinMaxAvg);
	  dataUpdatedCallbacks.add(refreshDataTable);
  }
  
  function switchChartType(newChartType){
	  chartType=newChartType;
	  addCriteria();
	  loadData();
  }
  
  
  
  function addCriteria(){
	  addCreatedCriteria(document.getElementById("datetime").value);
  }
  
  function setDefaults(){
	  d = new Date();
	  ds = d.toISOString();
	  ds = ds.substring(0,ds.length-13)+d.toLocaleTimeString();
	  document.getElementById("datetime").value = ds;
  }
  
  function applyDataFilters(){
	  chartData=sourceData;
	  console.log("TODO apply filters");
  }
  
  function refreshMinMaxAvg(){
	  $(".alert span.minValue").html(getMinMaxAvgValue('min'));
	  $(".alert span.avgValue").html(getMinMaxAvgValue('avg'));
	  $(".alert span.maxValue").html(getMinMaxAvgValue('max'));
  }
  
  function refreshChart(){
	  headerElement = $("#chartHeader");
      var ctx = $("#temperatureChart").get(0).getContext("2d");
	  switch (chartType) {
	  case 'H' : 
	  		createHourChart(chartData,ctx);
	  		headerElement.html("Hodinový pehled");
	  		break;
	  case 'D' : 
	  		createDayChart(chartData,ctx);
	  		headerElement.html("Denní přehled");
	  		break;
	  case 'M' :
	  		createMonthChart(chartData,ctx);
	  		headerElement.html("Měsíční přehled");
	  		break;
	  case 'Y' :
	  		createYearChart(chartData,ctx);
	  		headerElement.html("Roční přehled");
	  		break;
	  		
	  	
	  }
	 
    	  
  }
  
  function addCreatedCriteria(selectedDate,selectedTime) {
	  
	  
	  switch (chartType) {
	  case 'H' : 
		  	fromDate = new Date(selectedDate);
		  	fromDate.setHours(fromDate.getHours()-2,0,0,0);
		  	toDate = new Date(selectedDate);
		  	toDate.setHours(toDate.getHours()-2,59,59,0);
		  	qs.fromTime=fromDate.getTime();
		  	qs.toTime=toDate.getTime();
	  		break;
	  case 'D' :
		  	fromDate = new Date(selectedDate);
		  	fromDate.setDate(fromDate.getDate());
		  	fromDate.setHours(0,0,0,0);
		  	
		  	toDate = new Date(selectedDate);
		  	toDate.setDate(toDate.getDate());
		  	toDate.setHours(23,59,59,0);
		  	qs.fromTime=fromDate.getTime();
		  	qs.toTime=toDate.getTime();
		  	break;
	  case 'M' :
		  	fromDate = new Date(selectedDate);
		  	fromDate.setHours(0,0,0,0);
		  	fromDate.setDate(1);
		  	toDate = new Date(selectedDate);
		  	toDate.setHours(23,59,59,0);
		  	toDate.setDate(getNumberOfDays(fromDate.getYear(), fromDate.getMonth()));
		  	qs.fromTime=fromDate.getTime();
		  	qs.toTime=toDate.getTime();
		  	break;
	  case 'Y' :
		  break;    
	  }
	  qs.dataScope=chartType;	
  }

  
  function fireDataUpdated(data) {
	  sourceData=data;
	  dataUpdatedCallbacks.fire();
  }
  
  
  function loadData(callback){
	  if(callback===undefined) {
		  callback = fireDataUpdated;
	  }
	  $.ajax({url:window.app.ROOT_URL+"/data",data:qs,datatype:"jsonp", success:callback});
  }
  
  function refreshDataTable(){
	 tableBody = $("#dataTable tbody"); 
	 for(i=0;i<chartData.readings.length;i++){
		 reading = chartData.readings[i];
		 created = new Date(reading.created);
		 row="<tr><td>"+created.toLocaleString()+"</td><td>"+reading.nodeName+"</td><td>"+reading.sensorId+"</td><td>"+reading.value+reading.valueDimension+"</td></tr>";
		 tableBody.append(row);
		 
	 }
  }

  	function getMinMaxAvgValue(what){
  		var out="";
  		if(chartData.minMaxAvgDTO.length!=0) {
  			sensorIds = [];
  			for(i=0;i<chartData.minMaxAvgDTO.length;i++) {
 				 sensorIds.push(chartData.minMaxAvgDTO[i].sensorId);
 				 
 			 }
  			 sensorIds=sensorIds.getUnique();
  			 
  			 for(j=0;j<sensorIds.length;j++) {
  				 min = 100;
  				 max = -100;
  				 avg = 0;
  				 sum = 0;
  				 count = 0;
  				for(k=0;k<chartData.minMaxAvgDTO.length;k++) {
  					dto = sourceData.minMaxAvgDTO[k];
  	 				if(dto.sensorId==sensorIds[j])  {
  	 					if(min> dto.min) min = dto.min;
  	 					if(max< dto.max) max = dto.max;
  	 					count++;
  	 					sum+=dto.avg;
  	 					
  	 				}
  	 			 }
  				avg=sum/count;
  				
  				dout={};
  				dout.min=min;
  				dout.max=max;
  				dout.avg=avg;
  				 
  				out+=sensorIds[j]+":<strong>"+dout[what]+dto.valueDimension+"</strong><br>";
  			 }
  			 
  			

  		return out;
  		} else {
  			return 0;
  		}
  	}
  	
  

      function createYearChart(data,ctx){
        var chartData = {};
        chartData.labels=["Leden","Ăšnor","BĹ™ezen","Duben","KvÄ›ten","ÄŚerven","ÄŚervenec","Srpen","ZĂˇĹ™Ă­","Ĺ�Ă­jen","Listopad","Prosinec"];
        chartData.datasets=getDatasets(data,"Y");
        console.log(chartData);
        new Chart(ctx).Line(chartData,chartOptions);
      }

      function createMonthChart(data,ctx){
        var chartData = {};
        var date = new Date(data.readings[0].created);
        chartData.labels = getDateLabels(date.getMonth()+1, date.getFullYear());
        chartData.datasets = getDatasets(data, "M");
        console.log(chartData);
        new Chart(ctx).Line(chartData,chartOptions);
        
      }

      function createDayChart(data,ctx) {
        var chartData = {};
        chartData.labels = ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"];
        chartData.datasets=getDatasets(data,"D");
        console.log(chartData);
        new Chart(ctx).Line(chartData,chartOptions);        
      }


      function createHourChart(data,ctx) {
         var chartData = {};
         chartData.labels=["00:00","00:05","00:10","00:15","00:20","00:25","00:30","00:35","00:40","00:45","00:50","00:55"];
         chartData.datasets=getDatasets(data,"H");
         console.log(chartData);
         new Chart(ctx).Line(chartData,chartOptions);
      }

    function getDatasets(data, unit) {
      dataSets=[];
      plotData=[];
        
       
        for(r=0;r<data.sensorIds.length;r++) {
          sensorId=data.sensorIds[r];
          dataSets[r] = {
              fillColor : fillColors[r],
              strokeColor : strokeColors[r],
              pointColor : pointColors[r],
              pointStrokeColor : "#fff",
              data : getPlotData(data, sensorId, unit)
        };
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
      for(i=0;i<data.length;i++) {
        entry = data[i];
        //console.log(entry);
        var date = new Date(entry.created);
        var monthIndex = date.getMonth();
        for(j=0;j<entry.readings.length;j++) {
          reading = entry.readings[j];
          if(reading.sensorId==sensorId) {
            returnDataSet[monthIndex]=reading.value;
          }
        } 
      }
      return returnDataSet;
    }

    function getMonthPlotData(data, sensorId) {
      var d = new Date(data.readings[0].created);
      nod = getNumberOfDays(d.getFullYear(),d.getMonth());
      returnDataSet =[];
      for (var i = nod - 1; i >= 0; i--) {
        returnDataSet.push(0);
      };
      entries = data.minMaxAvgDTO;
      for(i=0;i<entries.length;i++) {
        entry = entries[i];
          if(entry.sensorId==sensorId) {
            returnDataSet[entry.day-1]=entry.avg;
          }
      }
      return returnDataSet;

    }


function getDayPlotData(data,sensorId) {
      returnDataSet=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      entries = data.readings;
      for(i=0;i<entries.length;i++) {
        entry = entries[i];
        //console.log(entry);
        var date = new Date(entry.created);
        var hourIndex = date.getHours()-1;
          
          if(entry.sensorId==sensorId) {
            returnDataSet[hourIndex]=entry.value;
          }
      }
      return returnDataSet;
    }

function getHourPlotData(data,sensorId){
      returnDataSet=[0,0,0,0,0,0,0,0,0,0,0,0];
      entries = data.readings;
      for(i=0;i<entries.length;i++) {
        entry = entries[i];
        var minuteIndex=getMinuteIndex(entry.minute);
        
          if(entry.sensorId==sensorId) {
            returnDataSet[minuteIndex]=entry.value;
          } 
      }
       return returnDataSet;
    }

