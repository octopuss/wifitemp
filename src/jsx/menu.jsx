/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap/Button');
var Icon = require('react-bootstrap/Glyphicon');
var ChartConstants = require('../src/js/ChartConstants');

var MenuButton = React.createClass({

    getInitialState: function() {
      return {active : false};
    },

    clickHandler: function () {
        alert(this.props.chartType)
    },

    render: function(){
        return (<Button bsStyle="primary" bsSize="large" onClick={this.clickHandler} block active={this.state.active}><Icon glyph={this.props.icon} className="pull-left"/>{this.props.text}</Button>)
    }

});

module.exports = React.createClass({
    getInitialState: function () {
        return null;
    },
    render: function () {
        return(<div>
            <MenuButton icon="dashboard" text="V hodině" chartType={ChartConstants.CHART_TYPE_HOUR}/>
            <MenuButton icon="time" text="Ve dne" chartType={ChartConstants.CHART_TYPE_DAY}/>
            <MenuButton icon="calendar" text="V měsící" chartType={ChartConstants.CHART_TYPE_MONTH}/>
            <MenuButton icon="stats" text="V roce" chartType={ChartConstants.CHART_TYPE_YEAR}/>
        </div>); //must be wrapped into element for successful compile
    }
});