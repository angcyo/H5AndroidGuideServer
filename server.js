var http = require('http');
let jcodecraeer = require('./jcodecraeer')

let port = 9898;
http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
    });
    //res.end(req.url);

    //jcodecraeer

    jcodecraeer.get({
        onResult: (json) => {
            res.end(json);
        }
    })
}).listen(9898, '127.0.0.1');


console.log(`Server running at http://127.0.0.1:${port}/`);