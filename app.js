var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var routes = require('./routes');
var repoActions = require('./routes/repository');

var app = express();

// view engine setup
require('node-jsx').install();
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine({jsx: {harmony: true},beautify:false}));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', routes.index);
app.get('/latest', repoActions.findLatest);
app.get('/data', repoActions.data);
app.get('/tmp', repoActions.tmp);


module.exports = app;
