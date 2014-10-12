/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap/Button');
var Icon = require('react-bootstrap/Glyphicon');
var ChartConstants = require('../src/js/ChartConstants');
var ChartStore = require('../src/js/ChartStore');
var AppDispatcher = require('../src/js/AppDispatcher');

var MenuButton = React.createClass({
    // initial state setup
    getInitialState: function() {
      return {active : false, chartType : this.props.chartType};
    },
    // add and remove listenners
    componentDidMount: function() {
        this.changeActiveState();
        ChartStore.addChangeListener(this.changeHandler);
    },

    componentWillUnmount: function() {
        ChartStore.removeChangeListener(this.changeHandler);
    },

    changeHandler: function() {

        this.changeActiveState();
    },

    clickHandler: function () {
        AppDispatcher.handleViewAction({
            actionType: ChartConstants.CHART_UPDATE_PLOT,
            chartType:this.state.chartType
        })
    },
    changeActiveState: function() {
        if(this.state.chartType == ChartStore.getCurrentChartType()) {
            this.setState({active:true});
        } else {
            this.setState({active:false});
        }
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