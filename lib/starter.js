
var React = require('react');
var App = require('../components/Application.jsx');

//hack without var it is global and we need it to start app
starter = {};
starter.main=function(data) {
    React.renderComponent(App(data),document.querySelector('body'));
};
