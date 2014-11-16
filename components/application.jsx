/** @jsx React.DOM */
/*
 App module
 */
var imgStyle = {'padding-top': '15px'};
var path = require('path');
var appDir = path.dirname(require.main.filename);
var React = require('react');
var Menu = require('./Menu.jsx');
var ChartPanel = require('./Chartpanel.jsx');
var LatestReading = require('./Latestreading.jsx');
var DatetimeSelector = require('./Datetimeselector.jsx');
var LastUpdated = require('./Lastupdated.jsx');
var ChartStore = require('../lib/ChartStore');

var Application = React.createClass({
    componentDidMount: function () {
        ChartStore.setup(this.props);
    },
    render: function () {
        return (<div className="container-fluid">
            <div className="media">
                <img className="pull-left" style={imgStyle} src="https://cdn2.iconfinder.com/data/icons/freecns-cumulus/32/519770-82_Thermometer_Half_Full-64.png"/>
                <h1 className="page-header">Teploměr
                    <small>Jungmannova</small>
                </h1>
            </div>
            <div className="row">
                <div className="col-md-2">
                    <div className="form-group" id="datetime-selector">
                        <DatetimeSelector/>
                    </div>
                    <h2>Přehledy</h2>
                    <div id="menu">
                        <Menu/>
                    </div>
                    <div id="latest-reading">
                        <LatestReading/>
                    </div>
                    <div id="last-updated">
                        <LastUpdated/>
                    </div>

                </div>
                <div id="panel" className="col-md-10">
                    <ChartPanel title="Přehled za období" chartId="temperatureChart"/>
                </div>
            </div>
        </div>);
    }
});
module.exports = Application;