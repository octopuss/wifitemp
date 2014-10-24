/** @jsx React.DOM */
var React = require('react');

var Layout = require('./Layout.jsx');
var App = require('../components/Application.jsx')
var Index = React.createClass({
    propTypes: {
        title: React.PropTypes.string
    },

    render: function() {
        return (
            <Layout title={this.props.title} generated={this.props.generated} js={this.props.js}>
                <App/>
            </Layout>
            );
    }
});

module.exports = Index;