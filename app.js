const express = require( 'express' );
const app = express(); // creates an instance of an express application
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
const routes = require('./routes');
const bodyParser = require('body-parser');
const socketio = require('socket.io');

var io = socketio.listen(server);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests
app.use('/', routes(io));
app.use(function (req, res, next) {

    next();
    // call `next`, or else your app will be a black hole — receiving requests but never properly responding
})
app.use(express.static('public'));

var server = app.listen(3000, function(){
    console.log('listening on 3000');
});

app.set('view engine', 'html'); // have res.render work with html files

app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks

nunjucks.configure('views'); // point nunjucks to the proper directory for templates


var locals = {
    title: 'An Example',
    people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'}
    ]
};
nunjucks.configure('views', {noCache: true});
nunjucks.render('index.html', locals, function (err, output) {
    //console.log(output);
});
