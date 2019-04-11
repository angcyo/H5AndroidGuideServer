const http = require('http');
const jcodecraeer = require('./jcodecraeer')
const my_csdn = require('./my_csdn')
const it_home = require('./it_home')
const androidweekly = require('./androidweekly')

let port = 9898;
http.createServer(function (request, response) {
    response.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
    });

    let url = request.url
    if (url.startsWith('/jcodecraeer')) {
        jcodecraeer.get({
            onResult: (json) => {
                response.end(json);
            }
        })
    } else if (url.startsWith('/angcyo')) {
        my_csdn.get({
            onResult: (json) => {
                response.end(json);
            }
        })
    } else if (url.startsWith('/ithome')) {
        it_home.get({
            onResult: (json) => {
                response.end(json);
            }
        })
    } else if (url.startsWith('/androidweekly')) {
        androidweekly.get({
            onResult: (json) => {
                response.end(json);
            }
        })
    } else {
        response.end(`大兄弟,不要乱搞啊!`);
    }
}).listen(9898, '127.0.0.1');


console.log(`Server running at http://127.0.0.1:${port}/`);