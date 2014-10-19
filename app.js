
var routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , express = require('express')
  , ejs = require('ejs')

var app = express();

app.configure(function(){
  app.set('port', 18080);
  app.set('views', __dirname + '/views');
  app.engine('.html', ejs.__express);
  app.set('view engine', 'html');
  app.use(express.favicon());
  app.use(express,logger('dev'));
  app.use(express.json());
  app.use(express.urlencode());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

routes(app);

var server = http.createServer(app);
server.listen(app.get('port'));