var jwt = require('jwt-simple');
var secret = 'xxx';
var Transaction = require('../models/Transaction');
var Account = require('../models/Account');


var creditOk = function(req, res, next) {
      if (Account.balance < Transaction.amount) {
          return res.status(409).json({message: 'Insufficient money'})
      }  else {
        next();
      }
  }

module.exports.creditOk = creditOk;
module.exports.secaret = secret;
