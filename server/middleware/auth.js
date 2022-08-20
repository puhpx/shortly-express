const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  console.log('req', req);
  if (req.cookies.shortlyid === undefined) {
    models.Sessions.create()
      .then((result) => {
        var id = result.insertId;
        models.Sessions.get({id})
          .then((result) => {
            req.session = result;
            //?????res.cookies.shortlyid = req.session.hash;
            res.cookie('shortlyid', req.session.hash);
            next();
          });
      });
  } else {
    var hash = req.cookies.shortlyid;

    models.Sessions.get({hash})
      .then((result) => {
        if (result) {
          console.log(result);
          req.session = result;
          next();
        } else {
          delete req.cookies.shortlyid;
          models.Sessions.create()
            .then((result) => {
              var id = result.insertId;
              models.Sessions.get({id})
                .then((result) => {
                  req.session = result;
                  res.cookie('shortlyid', req.session.hash);
                  next();
                });
            });
        }
      });
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

