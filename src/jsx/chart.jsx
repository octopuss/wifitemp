/** @jsx React.DOM */
    
var React = require('react');
//var charts = require('../bower_components/chartjs/Chart.js');
var ChartStore = require('../src/js/ChartStore');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            pending:true,
            options :{scaleShowGridLines : true,showTooltips: true}
        };
    },
    componentDidMount: function(){
        ChartStore.addPendingListener(this.togglePendingState);
        ChartStore.addDoneListener(this.dataUpdateDone);
        ChartStore.addChangeListener(this.changeHandler);
        ChartStore.addLoadListener(this.dataUpdateDone);
       // var ctx = document.getElementById(this.props.id).getContext("2d");
       // new charts(ctx).Line(this.state.data, this.state.options);
    },
    componentWillUnmount: function() {
        ChartStore.removeChangeListener(this.changeHandler);
        ChartStore.removePendingListener(this.togglePendingState);
        ChartStore.removeDoneListener(this.dataUpdateDone);
        ChartStore.removeLoadListener(this.dataUpdateDone)
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