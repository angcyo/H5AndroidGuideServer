const fs = require("fs")
const cheerio = require('cheerio')
// const iconv = require('iconv-lite')

var request = require('request');

var url = 'https://blog.csdn.net/angcyo'
var BASE_URL = "https://blog.csdn.net/angcyo"

let MAX_COUNT = 5

exports.get = (listener) => {
    request(url, function (error, response, body) {
        //console.log(body)
        // fs.writeFile('./csdn.html', body, (err) => {
        //     console.log('save')
        // })
        const $ = cheerio.load(body)
        let result = []
        $('.article-list').find('.article-item-box').each((index, elem) => {
            let style = $(elem).attr('style')

            if (!style || style.indexOf('display: none') == -1) {

                if (result.length >= MAX_COUNT) {
                    return
                }

                let item = {}
                result.push(item)


                let span = $(elem).find('a').eq(0).find('span').text().trim()
                item.title = $(elem).find('a').eq(0).last().text().trim() //.replace(/[\r\n]/g, '')

                if (span) {
                    item.title = item.title.replace(span, '')
                }

                item.des = $(elem).find('.content').text()
                item.link = $(elem).find('.content').find('a').attr("href")

                item.user = url.substring(url.lastIndexOf('/') + 1)

                item.time = $(elem).find('.date').text().split(' ')[0]
                item.see = $(elem).find('.num').eq(0).text()
                //console.log(item.see)
            }
        })

        listener.onResult(JSON.stringify(result))
    });
}

if (require.main === module) {
    exports.get()
}