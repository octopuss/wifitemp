var express = require('express');
var router = express.Router();
var react = require('react');
var path = require('path');
console.log(__dirname);
var appDir  = path.dirname(require.main.filename);
console.log();
var App = require(appDir+'/work/app');

/* GET home page. */

function formattedTime(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }
    today = dd+'.'+mm+'.'+yyyy;
    return today;
}

router.get('/', function(req, res) {
  var c =react.renderComponentToString(App());
  res.render('index', { title: 'Teploměr Jungmannova', content : c, generated:formattedTime()});
});

module.exports = router;
