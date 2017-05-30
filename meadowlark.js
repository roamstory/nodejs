var express = require('express');

var app = express();

//핸들바 뷰 엔진 설정
var handlebars = require('express-handlebars')
    .create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
var handlebarsPath = __dirname + '/views/layouts/';

app.set('views', handlebarsPath);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname+'/public'));

app.get('/', function(req, res) {
    console.log(__dirname+'/views/layouts/');
    res.render('home');
});

app.get('/about', function (req, res) {
    res.render('about');
});

// 404 폴백 핸들러
app.use(function(req, res, next) {
    res.status(404);
    res.render('404');
});

// 500 에러 핸들러
app.use(function(err, req, res, next) {
    console.error(err.stack);

    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});