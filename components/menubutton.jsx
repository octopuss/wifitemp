/** @jsx React.DOM */
/*
Menubutton module
 */
var React = require('react');
var Button = require('react-bootstrap/Button');
var ButtonIcon = require('./Buttonicon.jsx');
var ChartConstants = require('../lib/ChartConstants');
var ChartStore = require('../lib/ChartStore');
var AppDispatcher = require('../lib/AppDispatcher');


var MenuButton = React.createClass({
    // initial state setup
    getInitialState: function() {
        return {active : false, chartType : this.props.chartType, pending:false, disabled:false};
    },
    // add and remove listenners
    componentDidMount: function() {
        this.changeActiveState();
        ChartStore.addChangeListener(this.changeHandler);
        ChartStore.addPendingListener(this.togglePendingState);
        ChartStore.addDoneListener(this.togglePendingState);
    },

    componentWillUnmount: function() {
        ChartStore.removeChangeListener(this.changeHandler);
        ChartStore.removePendingListener(this.togglePendingState);
        ChartStore.removeDoneListener(this.togglePendingState);
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

    togglePendingState: function() {
            if(this.state.chartType == ChartStore.getCurrentChartType()) {
                if(!this.state.pending) {
                    this.setState({pending: true});
                    this.setState({disabled:true});
                } else {
                    this.setState({pending: false});
                    this.setState({disabled:false});
                }
            }
        else {
                if(!this.state.disabled) {
                    this.setState({disabled: true});
                } else {
                    this.setState({disabled: false});
                }
        }

    },

    render: function(){
        return (<Button bsStyle="primary" bsSize="large" onClick={this.clickHandler} block active={this.state.active} disabled={this.state.disabled}>{this.state.pending ? <ButtonIcon/> : <ButtonIcon icon={this.props.icon}/>}{this.props.text}</Button>)
    }

});

module.exports = MenuButton;