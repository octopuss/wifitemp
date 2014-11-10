var repo = require('../lib/ReadingRepository');



exports.findLatest = function(req, res){
    repo.findLatest(req.query.limit, function(data){
        res.send(data);
    });
};

exports.data = function(req,res) {
    repo.getData(req.query.fromTime,req.query.toTime,req.query.dataScope, function(data){
        res.send(data);
    });
};