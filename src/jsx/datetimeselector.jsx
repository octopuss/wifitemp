/** @jsx React.DOM */

var React = require('react');
var jQuery = require('jquery');
var moment = require('moment');

var AppDispatcher = require('../src/js/AppDispatcher');
var ChartConstants = require('../src/js/ChartConstants');
var ChartEnums = require('../src/js/ChartEnums');

require('../bower_components/datetimepicker/jquery.datetimepicker');



var DatetimeSelector = React.createClass({
    getInitialState: function(){
        return {datetime:moment()}
    },
    componentDidMount:function(){
       jQuery(this.refs.datetimefield.getDOMNode()).datetimepicker({format:'d.m.Y H:i',
            lang:'cs', onChangeDateTime:this.onInputChange});
    },
    onInputChange: function(e) {
           var m = moment(e);
           if(m.toString()!=this.state.datetime.toString()) { //only if datetime really changed
               var out = this.state.datetime;
               out+="->";
               this.setState({datetime:m});
               out+=this.state.datetime;
               console.log(out);
               AppDispatcher.handleViewAction({
                   actionType: ChartConstants.CHART_UPDATE_DATETIME,
                   datetime:this.state.datetime
               })
           }
    },

    formatDatetime: function(val) {
        return moment(val).format(ChartEnums[ChartConstants.MOMENT_DATETIME_FORMAT]);
    },

    render:function(){
        return(<div><label htmlFor="datetimefield">Datum</label>
            <input ref="datetimefield" name="datetimefield" value={this.formatDatetime(this.state.datetime)} readOnly/>
        </div>);
    }
});

module.exports=DatetimeSelector;