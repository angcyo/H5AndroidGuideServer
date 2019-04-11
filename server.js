const http = require('http');
const jcodecraeer = require('./jcodecraeer')
const my_csdn = require('./my_csdn')
const it_home = require('./it_home')
const androidweekly = require('./androidweekly')
const wanandroid = require('./wanandroid')
const gityuan = require('./gityuan')

const port = 9898;
const ip = '0.0.0.0'
http.createServer(function (request, response) {
    response.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        // 'Access-Control-Allow-Origin': '*'
    });

    let url = request.url

    console.log(`收到请求:${url}`);
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
    } else if (url.startsWith('/wanandroid')) {
        wanandroid.get({
            onResult: (json) => {
                response.end(json);
            }
        })
    } else if (url.startsWith('/gityuan')) {
        gityuan.get({
            onResult: (json) => {
                response.end(json);
            }
        })
    } else {
        response.end(`大兄弟,不要乱搞啊!`);
    }
}).listen(9898, ip);

console.log(`Server running at http://${ip}:${port}/`);