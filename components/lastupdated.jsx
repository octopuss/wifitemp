/** @jsx React.DOM */

var React = require('react');
var ChartStore = require('../lib/ChartStore');
var ChartConstants = require('../lib/ChartConstants');

var LastUpdated = React.createClass({
    getInitialState: function() {
      return {
          lastUpdated:ChartStore.getLastUpdated()
      };
    },
    componentDidMount: function() {
        ChartStore.addListener(ChartConstants.CHANGE_EVENT,this.changeHandler);
        ChartStore.addListener(ChartConstants.LOAD_EVENT,this.changeHandler)
    },
    changeHandler: function() {
        this.setState({lastUpdated:ChartStore.getLastUpdated()});
    },
    componentWillUnmount: function() {
        ChartStore.removeListener(ChartConstants.CHANGE_EVENT,this.changeHandler);
        ChartStore.removeListener(ChartConstants.LOAD_EVENT,this.changeHandler);
    },
    render: function(){
        return(<div>
            Poslední aktualizace :<br/><kbd>{this.state.lastUpdated}</kbd>
        </div>)
    }
});

module.exports = LastUpdated;