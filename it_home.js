const fs = require("fs")
const cheerio = require('cheerio')

var request = require('request');

var url = 'https://www.ithome.com/blog/'
var BASE_URL = url

let MAX_COUNT = 5

exports.get = (listener) => {
    request(url, function (error, response, body) {
        const $ = cheerio.load(body)
        let result = []
        $('.cate_list').find('.ulcl').find('li').each((index, elem) => {
            if (result.length >= MAX_COUNT) {
                return
            }

            let item = {}
            result.push(item)

            item.title = $(elem).find('.block').find('h2').find('a').eq(0).text().trim()
            item.time = $(elem).find('.block').find('h2').find('span').eq(0).text().trim()

            item.des = $(elem).find('.block').find('.memo').eq(0).text().trim()

            item.link = $(elem).find('a').eq(0).attr("href")

            item.user = 'IT之家'

            item.see = '--'
            console.log(item.link)

        })

        listener && listener.onResult(JSON.stringify(result))
    });
}

if (require.main === module) {
    exports.get()
}