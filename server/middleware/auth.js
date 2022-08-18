const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  req.session = {};

  if (!req.cookies.shortlyid) {
    console.log('i am here');
    models.Sessions.create()
      .then(models.Model.get({userId: NULL})
        .then((result) => {
          console.log('###---###', result);
        }));
  } else {
    req.session.hash = req.cookies.shortlyid;
    console.log(req.session.hash);
    models.Sessions.get({hash: req.session.hash})
      .then((result) => {
        console.log(result);
      });
  }
  next();
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

