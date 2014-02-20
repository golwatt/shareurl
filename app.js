var restify = require('restify');
var randomWord = require('./random-word.js');
var urlRecord = require('./url-record.js');

var ip_addr = process.env.OPENSHIFT_NODEJS_IP;
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var server = restify.createServer({
  name: "shareurl"
});

server.use(restify.queryParser());
server.use(restify.CORS());

server.get({path: '/sendurl', version: '0.0.1'}, sendUrl);
server.get({path: '/geturl', version: '0.0.1'}, getUrl);

function sendUrl(req, res, next) {
  console.log('send url: %s', req.params.longUrl);
  
  var key;
  do {
    key = randomWord.generate();
  } while (urlRecord.isKeyUsed(key));

  var record = urlRecord.Record.createNew();
  record.url = req.params.longUrl;
  record.timestamp = Date.now();
  urlRecord.setRecord(key, record);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(200, {"Content-Type": "application/json"});
  var json = JSON.stringify({
    keyword: key
  });
  res.end(json);
}

function getUrl(req, res, next) {
  console.log('get key: %s', req.params.key);
  
  var record = urlRecord.getRecord(req.params.key);
  
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (typeof record == 'undefined') {
    res.writeHead(500, {"Content-Type": "text/plain"});
    res.end('shared URL not found');
  } else {
    console.log('url: %s', record.url);
    res.writeHead(200, {"Content-Type": "application/json"});
    var json = JSON.stringify({
      url: record.url
    });
    urlRecord.clearRecord(req.params.key);
    res.end(json);
  }
}

server.listen(port, ip_addr, function(){
  console.log('%s is listening at %s', server.name, server.url);
});
