var http = require('http');
var server = http.createServer(requestHandler); 
server.listen(process.env.PORT, process.env.IP, startHandler);

function startHandler()
{
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
}

function requestHandler(req, res) 
{
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    if (query['cmd'] == 'repeat')
    {
        for(var i = 0; i < query['word'].length; i++)
        {
            res.write('<p>'+query['word']+'<p>');
        }
    }
    if (query['cmd'] == 'dotted')
    {
        
    }
    if (query['cmd'] == 'stats')
    {
        
    }
}