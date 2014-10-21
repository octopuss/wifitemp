/** @jsx React.DOM */

var React = require('react');
var ChartStore = require('../src/js/ChartStore');

var LastUpdated = React.createClass({
    getInitialState: function() {
      return {
          lastUpdated:ChartStore.getLastUpdated()
      };
    },
    componentDidMount: function() {
        ChartStore.addChangeListener(this.changeHandler);
        ChartStore.addLoadListener(this.changeHandler)
    },
    changeHandler: function() {
        this.setState({lastUpdated:ChartStore.getLastUpdated()});
    },
    componentWillUnmount: function() {
        ChartStore.removeChangeListener(this.changeHandler);
        ChartStore.removeLoadListener(this.changeHandler);
    },
    render: function(){
        return(<div>
            Poslední aktualizace :<br/><kbd>{this.state.lastUpdated}</kbd>
        </div>)
    }
});

module.exports = LastUpdated;