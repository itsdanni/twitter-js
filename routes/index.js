const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  let tweets = tweetBank.list();

  res.render( 'index', { tweets: tweets, showForm: true } );
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var tweet = tweetBank.find( {name: name} );
//   console.log('name: ', name);
//   console.log('tweets: ', tweet);
  res.render( 'index', {tweets: tweet, showForm: true} );
});

router.get('/tweets/:id', function(req, res) {
    var id = req.params.id;
    var tweet = tweetBank.find( {id: id});
    res.render('index', {tweets: tweet});
});

router.post('/tweets', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
});

module.exports = function (io) {
  // ...
  // route definitions, etc.
  // ...
    router.get('/', function (req, res) {
    let tweets = tweetBank.list();

    res.render( 'index', { tweets: tweets, showForm: true } );
    });

    router.get('/users/:name', function(req, res) {
    var name = req.params.name;
    var tweet = tweetBank.find( {name: name} );
    //   console.log('name: ', name);
    //   console.log('tweets: ', tweet);
    res.render( 'index', {tweets: tweet, showForm: true} );
    });

    router.get('/tweets/:id', function(req, res) {
        var id = req.params.id;
        var tweet = tweetBank.find( {id: id});
        res.render('index', {tweets: tweet});
    });

    router.post('/tweets', function(req, res) {
        var name = req.body.name;
        var text = req.body.text;
        tweetBank.add(name, text);
        io.sockets.emit('newTweet', { /* tweet info */ });
        res.redirect('/');
    });

    return router;
};
