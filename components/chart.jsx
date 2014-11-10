/** @jsx React.DOM */
/*
    Chart module
*/
    
var React = require('react');
var ChartStore = require('../lib/ChartStore');
var ChartConstants = require('../lib/ChartConstants');
var ChartEnums = require('../lib/ChartEnums');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            pending:true,
            options :{scaleShowGridLines : true,showTooltips: true}
        };
    },
    componentDidMount: function(){
        ChartStore.addListener(ChartConstants.PENDING_EVENT,this.togglePendingState);
        ChartStore.addListener(ChartConstants.LOADING_DONE_EVENT,this.dataUpdateDone);
        ChartStore.addListener(ChartConstants.CHANGE_EVENT,this.changeHandler);
        ChartStore.addListener(ChartConstants.LOAD_EVENT,this.dataUpdateDone);
    },
    componentWillUnmount: function() {
        ChartStore.removeListener(ChartConstants.CHANGE_EVENT,this.changeHandler);
        ChartStore.removeListener(ChartConstants.PENDING_EVENT,this.togglePendingState);
        ChartStore.removeListener(ChartConstants.LOAD_EVENT,this.dataUpdateDone);
        ChartStore.removeListener(ChartConstants.LOADING_DONE_EVENT,this.dataUpdateDone)
    },
    dataUpdateDone:function(){
        var charts = require('chart.js/Chart');
        var gui= ChartStore.getUi();
        this.setState({pending:false});
        this.forceUpdate();
        var ctx = document.getElementById(this.props.id).getContext("2d");
        new charts(ctx).Line(gui,this.state.options);

    },
    togglePendingState: function(){
        this.setState({pending:!this.state.pending});
    },

    changeHandler: function() {

    },

    render: function(){
        return (!this.state.pending ? <canvas id={this.props.id} width="1000" height="400"></canvas> : <div className="loadingProgress"><i className="fa fa-spinner fa-spin"/></div>)
    }
});