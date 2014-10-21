/** @jsx React.DOM */
var imgStyle={'padding-top':'15px'};
var React = require('react');
var Menu = require('./menu.js');
var ChartPanel = require('./chartpanel.js');
var LatestReading = require('./latestreading.js');
var DatetimeSelector = require('./datetimeselector.js');
var LastUpdated = require('./lastupdated.js');
var ChartStore = require('../src/js/ChartStore');

var App = React.createClass({
    componentDidMount: function(){
        ChartStore.setup(this.props);
    },
    render: function(){
        return(<div className="container-fluid">
            <div className="media">
                <img className="pull-left" style={imgStyle} src="https://cdn2.iconfinder.com/data/icons/freecns-cumulus/32/519770-82_Thermometer_Half_Full-64.png"/>
                <h1 className="page-header">Teploměr <small>Jungmannova</small></h1>
            </div>
            <div className="row">
                <div className="col-md-2">
                    <div className="form-group" id="datetime-selector"><DatetimeSelector/></div>
                    <h2>Přehledy</h2>
                    <div id="menu"><Menu/></div>
                    <div id="latest-reading"><LatestReading/></div>
                    <div id="last-updated"><LastUpdated/></div>

                </div>
                <div id="panel" className="col-md-10">
                    <ChartPanel title="Přehled za období" chartId="temperatureChart"/>
                </div>
            </div>
        </div>);
    }
});
module.exports=App;