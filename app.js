const express = require( 'express' );
const app = express(); // creates an instance of an express application
const nunjucks = require('nunjucks');
const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
app.use(function (req, res, next) {
    console.log(req.method, req.path);
    next();
    // call `next`, or else your app will be a black hole — receiving requests but never properly responding
})
app.listen(3000, function() {
    console.log('server listeing...');
});
app.get('/', function(req, res){
    //res.send('welcome');
    res.render( 'index', {title: 'Hall of Fame', people: people} );
});
app.get('/news', function(req, res){
    res.send('welcome news');
})
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
    console.log(output);
});
