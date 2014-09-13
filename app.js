

var sys = require("sys"),
    express = require("express"),
	stylus = require("stylus"),
	nib = require("nib")

ziggeo = require('./ziggeo/ziggeo-sdk.js');
ziggeo.init('588b7c37a225c952d8d878ea335c9556', 'c8862d79ff7d3c10b2d1d9ea8a234e89', '45656cfce15490d3b7f32b956f3dca16');


sys.puts("Hello World");

var app = express()
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {

  callbacks = {
  	success: function(data) {
  		
  		var array = [];
  		for(var i = 0; i < data.length; i++) {
  			var obj = data[i];
  			array.push(obj["token"]);
  		}

		res.render('index', {
			videos : array
		});
	},
   	failure: function() {
   		sys.puts("failure");
   	}
  }

  ziggeo.Videos.index({}, callbacks);
})

app.get('/record', function (req, res) {

  res.render('record', {});
})

app.listen(3000, '0.0.0.0')
