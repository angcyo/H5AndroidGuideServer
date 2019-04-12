const http = require("http")
const cheerio = require('cheerio')
const iconv = require('iconv-lite')
const errorLog = require('./error')

// var request = require('request');

var url = 'http://www.jcodecraeer.com/essence/'
var BASE_URL = "http://www.jcodecraeer.com"

let MAX_COUNT = 5

exports.get = (listener) => {
    http.get(url, (res) => {
        let buffer = [];
        res.on('data', (chunk) => {
            buffer.push(chunk);
        });

        let body = ''
        res.on('end', () => {
            // console.log("..........end...............")
            body = iconv.decode(Buffer.concat(buffer, buffer.size), "gb2312")
            const $ = cheerio.load(body)
            //console.log($('.archive-list').html())

            let result = []
            $('.archive-item').each(function (index, elem) {
                if (result.length >= MAX_COUNT) {
                    return
                }
                // console.log(index)
                // console.log($(this).html())
                let item = {}
                result.push(item)

                let archive_detail = $(this).find('.archive-detail')
                //console.log(archive_detail.find("h3").text())
                item.title = archive_detail.find("h3").text()
                item.des = archive_detail.find("p").text()
                item.link = `${BASE_URL}${archive_detail.find('a').attr("href")}`
                item.time = archive_detail.find(".archive-data").find(".glyphicon-class").text()
                item.user = archive_detail.find(".list-user").text().trim()
                item.see = archive_detail.find(".list-msg").find("span").eq(1).text()
                //console.log(item.see)
            })
            //console.log(JSON.stringify(result))
            listener && listener.onResult(JSON.stringify(result))
        }).on("error", (e) => {
            errorLog.log(e)
        });
    })
}