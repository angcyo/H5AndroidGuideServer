var request = require('request');

var url = 'http://39.108.53.184:9898/'

exports.get = (listener) => {
    request(url, function (error, response, body) {
        console.log(body)
        console.log(error)
        console.log(response)

        listener && listener.onResult(JSON.stringify(result))
    });
}

if (require.main === module) {
    exports.get()
}