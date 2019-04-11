const fs = require("fs")
const cheerio = require('cheerio')

var request = require('request');

var url = 'http://gityuan.com/'
var BASE_URL = url

let MAX_COUNT = 5

exports.get = (listener) => {
    request(url, function (error, response, body) {
        $ = cheerio.load(body)
        let result = []

        $('.postlist-container').eq(0).find('.post-preview').each((index, elem) => {
            if (result.length >= MAX_COUNT) {
                return
            }

            let item = {}
            result.push(item)

            item.title = $(elem).find('h2').eq(0).text().trim()
            item.link = $(elem).find('a').eq(0).attr("href")
            if (item.link && !item.link.startsWith('http')) {
                item.link = BASE_URL + item.link
            }

            item.time = $(elem).find('.post-meta').eq(0).text().trim().replace('Posted by Gityuan on ', '')

            item.des = $(elem).find('.post-content-preview').text().trim()

            item.user = 'Gityuan'

            item.see = '--'
            // console.log(item.des)
        })

        listener && listener.onResult(JSON.stringify(result))
    });
}

if (require.main === module) {
    exports.get()
}