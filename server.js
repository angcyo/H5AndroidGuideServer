const http = require('http');
const fs = require('fs');
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
        'Access-Control-Allow-Origin': 'http://www.angcyo.com',
        // 'Access-Control-Allow-Origin': 'http://127.0.0.1'
    });

    let url = request.url

    let time = new Date().toLocaleString()
    let urlLog = `${time} 收到请求:${url}\r\n`
    console.log(`${time} 收到请求:${url} ${request.headers['host']}`);
    httpLog(urlLog)
    for (const key in request.headers) {
        if (request.headers.hasOwnProperty(key)) {
            const element = request.headers[key];
            httpLog(`${key}->${element}\r\n`)
        }
    }

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

function httpLog(data) {
    fs.appendFile('log.log', data, (err) => {

    });
}

console.log(`Server running at http://${ip}:${port}/`);