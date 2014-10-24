/** @jsx React.DOM */

var React = require('react');
var MenuButton = require('./Menubutton.jsx');
var ChartConstants = require('../lib/ChartConstants');


module.exports = React.createClass({
    render: function () {
        return(<div>
            <MenuButton icon="dashboard" text="V hodině" chartType={ChartConstants.CHART_TYPE_HOUR}/>
            <MenuButton icon="time" text="Ve dne" chartType={ChartConstants.CHART_TYPE_DAY}/>
            <MenuButton icon="calendar" text="V měsící" chartType={ChartConstants.CHART_TYPE_MONTH}/>
            <MenuButton icon="stats" text="V roce" chartType={ChartConstants.CHART_TYPE_YEAR}/>
        </div>); //must be wrapped into element for successful compile
    }
});