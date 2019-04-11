var http = require('http');
var iconv = require('iconv-lite');
http.get('http://www.jcodecraeer.com/essence/', function (res) {
    var length = 0;
    var arr = [];
    res.on("data", function (chunk) {
        arr.push(chunk);
        length += chunk.length;
    });
    res.on("end", function () {
        var data = Buffer.concat(arr, arr.size);
        var change_data = iconv.decode(data, 'gb2312');
        console.log(change_data.toString());
    })
});