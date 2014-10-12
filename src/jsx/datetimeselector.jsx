var React = require('react');
var DateTimePicker = require("react-bootstrap-datetimepicker").DateTimePicker;

var DatetimeSelector = React.createClass({
    render:function(){
        return(<div><label for="datetime">Datum</label>
            <DateTimePicker/>
        </div>);
    }
});

module.exports=DatetimeSelector;