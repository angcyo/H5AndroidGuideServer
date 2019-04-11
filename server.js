var http = require('http');
let jcodecraeer = require('./jcodecraeer')
let my_csdn = require('./my_csdn')

let port = 9898;
http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
    });
    //res.end(req.url);

    let url = req.url
    if (url.startsWith('/jcodecraeer')) {
        jcodecraeer.get({
            onResult: (json) => {
                res.end(json);
            }
        })
    } else if (url.startsWith('/angcyo')) {
        my_csdn.get({
            onResult: (json) => {
                res.end(json);
            }
        })
    } else {
        res.end(`非法请求:${url}`);
    }
    //jcodecraeer

}).listen(9898, '127.0.0.1');


console.log(`Server running at http://127.0.0.1:${port}/`);