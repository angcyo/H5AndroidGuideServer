const fs = require('fs')

exports.log = function (error) {
    let time = new Date().toLocaleString()
    fs.appendFile('error.log', `${time}\r\n`, (err) => {

    })
    fs.appendFile('error.log', error, (err) => {

    });
}