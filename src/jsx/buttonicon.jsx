/** @jsx React.DOM */

var React = require('react');
var Icon = require('react-bootstrap/Glyphicon');

var ButtonIcon = React.createClass({

    render:function(){
        if(this.props.icon==undefined) {
            return(<i className="fa fa-spinner fa-spin pull-left"/>);
        }else {
            return(<Icon glyph={this.props.icon} className="pull-left"/>);
        }

    }
});

module.exports=ButtonIcon;