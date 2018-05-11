var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var Account = require('../models/Account');
var Transaction = require('../models/Transaction');
var auth = require('../middlewares/auth');
var credit = require('../middlewares/credit');
var randomString = require('random-string')


router.post('/signup', function(req, res) {
    var account = new Account();
    account.name = req.body.name;
    account.surname = req.body.surname;
    account.password = bcrypt.hashSync(req.body.password, 10);
    account.email = req.body.email;
    account.iban = randomString();
    account.balance = 1000;
    account.save(function(err, accountCreated) {
        if (err) return res.status(400).json(err);
        res.status(201).json(accountCreated);
    })
})

router.post('/login', function(req, res) {
    Account.findOne({email: req.body.email}, function(err, account){
        if (account === null) {
            return res.status(404).json({message: 'Account not found'})
        } else if (bcrypt.compareSync(req.body.password, account.password)) {
            var token = jwt.encode(account._id, auth.secret);
            return res.json({token: token});
        } else {
            return res.status(401).json({message: 'Password is not valid'});
        }

    })

})

router.get('/me', auth.verify, function(req, res, next) {
    res.json(req.account);
});

router.get('/name', auth.verify, function(req, res) {
    res.json(req.account.name);
})

router.get('/users/:name', function(req, res) {
  Account.find({}, 'name surname email iban', function (err, accounts) {
      res.json(accounts);
  });
})

router.get('/users', auth.verify, function(req, res) {
  Account.find({}, 'name surname email iban', function (err, accounts) {
      res.json(accounts);
  });
})


  router.post('/transaction', auth.verify, credit.creditOk ,function(req, res) {
    var transaction = new Transaction();

        transaction.amount= req.body.amount;




        transaction.save(function(err, transactionOk) {
            if (err) return res.status(400).json(err);
            res.status(201).json(transactionOk);
        })
})

router.get('/showTransaction', auth.verify,function(req, res) {
Transaction.find(function(err, transactions){
  res.json(transactions);
});
})


module.exports = router;
