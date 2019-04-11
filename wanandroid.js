const fs = require("fs")
const cheerio = require('cheerio')

var request = require('request');

var url = 'https://www.wanandroid.com/'
var BASE_URL = url

let MAX_COUNT = 7

exports.get = (listener) => {
    request(url, function (error, response, body) {
        $ = cheerio.load(body)
        let result = []

        $('.list_article').eq(0).find('li').each((index, elem) => {
            if (result.length >= MAX_COUNT) {
                return
            }

            let item = {}
            result.push(item)

            item.title = $(elem).find('.info_art').find('a').eq(0).text().trim()
            item.link = $(elem).find('.info_art').find('a').eq(0).attr("href")

            item.time = $(elem).find('.aniceDate').eq(0).text().trim().replace('时间：', '')

            item.des = $(elem).find('.achapter').text().trim()

            item.user = $(elem).find('.aauthor').find('a').eq(0).text()

            item.see = '--'
            // console.log(item.user)
        })

        listener && listener.onResult(JSON.stringify(result))
    });
}

if (require.main === module) {
    exports.get()
}