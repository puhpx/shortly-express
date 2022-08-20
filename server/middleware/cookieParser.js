const models = require('../models/model');

const parseCookies = (req, res, next) => {

  var cookies = req.headers.cookie;
  if (cookies) {
    var cookieArr = cookies.split('; ');
    for (var i = 0; i < cookieArr.length; i++) {
      var arr = cookieArr[i].split('=');
      req.cookies[arr[0]] = arr[1];
    }
  } else {
    req.cookies = {};
  }
  next();

};

module.exports = parseCookies;