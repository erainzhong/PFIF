var express = require('express');
var index = require('./routes/cgi/index');
var find = require('./routes/cgi/find');
var add = require('./routes/cgi/add');
var login = require('./routes/cgi/login');
var exit = require('./routes/cgi/exit');
var upload = require('./routes/cgi/upload');
var http = require('http');
var path = require('path');
var redis = require('redis');

var app = express();


var RedisStore = require('connect-redis')(express),
    rClient = redis.createClient(),
    sessionStore = new RedisStore({client:rClient});

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser()); 
app.use(express.session({
	store : sessionStore,
	cookie : {maxAge : 1000*60*60*24*7},
	secret : 'pfif'
}));
app.use(express.bodyParser({
	uploadDir: "source/imgcache/",
	keepExtensions: true,
	limit: 10000000, // 10M limit
	defer: true  //enable event            
}));
app.use(function(req,res,next){
	//todo 有些请求可能无需登录态，这里就不劫持了
	var url = req.originalUrl;
	if(true){
		login.isLogin(req,res,function(){
			login.login(req,res);
			next();
		},function(){
			next();
		});
	}else{
		next();
	}
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));//网站静态资源

// development only
if ('development' == app.get('env')) {
	//app.use(express.errorHandler());
}

app.get('/', index.index);
app.get('/index', index.index);
app.get('/debug', index.index);
app.get('/cgi/find', find.findPerson);
app.post('/cgi/add',add.addPerson);
app.get('/cgi/exit', exit.exit);
app.post('/cgi/upload', upload.uploadImg);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});