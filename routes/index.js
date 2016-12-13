var express = require('express');
var router = express.Router();
var Room = require('../models/Room'); //room 모델을 포함
var User = require('../models/User'); // user모델을 포함
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index'); // 홈페이지를 열면 index.jade를 보여준다.
});
router.get('/hosting/:id', function(req, res, next) {
  User.findById(req.params.id,function(err,user){
  if(err)
  {
    return next(err);
  }
   res.render('hosting',user); 
  });
  
});
router.get('/:id', function(req, res, next) {

  Room.findById(req.params.id,function(err,room){
    if(err){
        return next(err);
    }
    room.reservation=true;
    room.save(function(err){
      if(err){
        return next(err);
      }
      res.render('index');
    });
  });
 
});


module.exports = router;
