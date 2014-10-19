/** @jsx React.DOM */
    
var React = require('react');
var charts = require('../bower_components/chartjs/Chart.js');
var ChartStore = require('../src/js/ChartStore');
var ProgressBar = require('react-bootstrap/ProgressBar');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            data :{
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "My First dataset",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: [65, 59, 80, 81, 56, 55, 40]
                    },
                    {
                        label: "My Second dataset",
                        fillColor: "rgba(151,187,205,0.2)",
                        strokeColor: "rgba(151,187,205,1)",
                        pointColor: "rgba(151,187,205,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        data: [28, 48, 40, 19, 86, 27, 90]
                    }
                ]
            },
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
        return (!this.state.pending ? <canvas id={this.props.id} width="1000" height="400"></canvas> : <ProgressBar className="loadingProgress" active now={100} />)
    }
});