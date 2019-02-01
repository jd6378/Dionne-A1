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
        var output;
        output = query['word1'];
        for(var i = 0; i < (30 - query['word1'].length - query['word2'].length);i++)
            output += ".";
        res.write(output + query['word2'])
    }
    if (query['cmd'] == 'stats')
    {
        var sum = 0;
        var max = 0;
        var min = 100;
        for (var i in query['grades'])
            {
                if(max < parseFloat(query['grades'][i]))
                    max = parseFloat(query['grades'][i]);
                if(min > parseFloat(query['grades'][i]))
                    min = parseFloat(query['grades'][i]);
                sum += parseFloat(query['grades'][i]);
            }
        res.write("Ave: " + (sum/query['grades'].length).toFixed(2) + " Min: " + min + " Max: " + max)
        
    }
    res.end('');
}