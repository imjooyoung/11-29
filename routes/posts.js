var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Room = require('../models/Room');

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/');
  }
}
/*
function validateForm(form, options) {
  var name = form.name || "";
  var email = form.email || "";
  name = name.trim();
  email = email.trim();
  if (!name) {
    return '제목을 입력해주세요.';
  }
  if (!email) {
    return '이메일을 입력해주세요.';
  }
  if (!form.password && options.needPassword) {
    return '비밀번호를 입력해주세요.';
  }
  if (form.password !== form.password_confirmation) {
    return '비밀번호가 일치하지 않습니다.';
  }
  if (form.password.length < 6) {
    return '비밀번호는 6글자 이상이어야 합니다.';
  }
  return null;
}
*/

router.get('/', function(req, res, next) {
  Room.find({},function(err,rooms){
    res.render('posts',{rooms:rooms});
  });
});

router.post('/',needAuth, function(req, res, next) {
  Room.find({city:req.body.position},function(err,rooms){
    res.render('posts',{rooms:rooms});
  });
});

/*router.post('/', function(req, res, next) {
   res.render('posts');
 });*/

module.exports = router;
