<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
 <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Teploměr</title>
           <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
       
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
   
    <!-- Bootstrap -->
     <spring:url value="/resources/css/bootstrap.min.css" var="bs_css_url"/>
        <link rel="stylesheet" href="${bs_css_url}" />
        <spring:url value="/" var="root_url" />
        <script type="text/javascript">
        window.app = window.app || {};
        window.app.ROOT_URL="${fn:substring(root_url,0, fn:length(root_url)-1)}";
        </script>
          <spring:url value="/resources/js/utils.js" var="utils_js_url"/>
            <script src="${utils_js_url}"></script>
            <spring:url value="/resources/js/datepicker/jquery.datetimepicker.js" var="dp_js_url"/>
            <script src="${dp_js_url}"></script>
            
            <spring:url value="/resources/js/moment.min.js" var="moment_js_url"/>
            <script src="${moment_js_url}"></script>
        <spring:url value="/resources/js/main.js" var="main_js_url"/>
        
            <script src="${main_js_url}"></script>
            
     <spring:url value="/resources/js/datepicker/jquery.datetimepicker.css" var="dp_css_url"/>
        <link rel="stylesheet" href="${dp_css_url}" />       
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    


     <div class="container-fluid">
       <div class="media"><img class="pull-left" style="padding-top:15px" src="https://cdn2.iconfinder.com/data/icons/freecns-cumulus/32/519770-82_Thermometer_Half_Full-64.png"><h1 class="page-header">Teploměr <small>Jungmannova</small></h1></div>
        <div class="row">
          <div class="col-xs-4 col-md-2">
          	<div class="form-group">
    <label for="datetime">Datum</label>
    <input type="text" class="form-control" id="datetime">
  </div>
            <h2>Přehledy</h2>
            <a href="#" class="btn btn-primary btn-lg btn-block" onclick="switchChartType('H');"><span style="margin-left:10px" class="pull-left glyphicon glyphicon-dashboard"></span>Hodinový</a><br>
            <a href="#" class="btn btn-primary btn-lg btn-block" onclick="switchChartType('D');"><span style="margin-left:10px"class="pull-left glyphicon glyphicon-time"></span>Denní</a><br>
            <a href="#" class="btn btn-primary btn-lg btn-block" onclick="switchChartType('M');"><span style="margin-left:10px" class="pull-left glyphicon glyphicon-calendar"></span>Měsíční</a><br>
            <a href="#" class="btn btn-primary btn-lg btn-block" onclick="switchChartType('Y');"><span style="margin-left:10px"class="pull-left glyphicon glyphicon-stats"></span>Roční</a><br>
            <div class="alert alert-warning" style="text-align:center">
              <strong>Aktuální teplota</strong>
              <h2>33°C</h2>
            </div>
            <div>Poslední aktualizace:<br><kbd>${generatedDate}</kbd></div>
          </div>
          <div class="col-xs-14 col-md-10">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title"><span class="glyphicon glyphicon-tasks"></span> Přehledy</h3>
              </div>
              <div class="panel-body">
                <div class="col-xs-14 col-md-10">
                  <canvas id="temperatureChart" width="1000" height="400"></canvas>
                </div>
                <div class="col-xs-4 col-md-2">
                  <div class="alert alert-info">Nejnižší:<br><span class="minValue"><strong>15.2°C</strong></span></div>
                  <div class="alert alert-warning">Průměrná:<br><span class="avgValue"><strong>17.2°C</strong></span></div>
                  <div class="alert alert-danger">Nejvyšší:<br><span class="maxValue"><strong>25.2°C</strong></span></div>
                </div>
              </div>
            </div>
            <table class="table table-striped" id="dataTable">
      <thead>
        <tr>
          <th>Date</th>
          <th>Node</th>
          <th>Sensor</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        
      </tbody>
    </table>
          </div>
        </div>
      </div>  
     




   
    <script>
    
    </script>

    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <spring:url value="/resources/js/bootstrap.min.js" var="bs_js_url"/>
    <script src="${bs_js_url}"></script>
     <spring:url value="/resources/js/Chart.min.js" var="chart_js_url"/>
    <script src="${chart_js_url}"></script>
  </body>
</html>
   