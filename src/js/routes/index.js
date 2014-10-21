var express = require('express');
var router = express.Router();
var react = require('react');
console.log(__dirname);
var App = require('../../../work/app');

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
    console.log(c);
  res.render('index', { title: 'Teploměr Jungmannova', content : c, generated:formattedTime()});
});

module.exports = router;
