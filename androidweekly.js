const fs = require("fs")
const cheerio = require('cheerio')

var request = require('request');

var url = 'https://www.androidweekly.cn/'
var BASE_URL = url

let MAX_COUNT = 9

exports.get = (listener) => {
    request(url, function (error, response, body) {
        let $ = cheerio.load(body)
        let cardUrl = BASE_URL + $('.row').find('.card').eq(0).find('.card-header').eq(0).find('a').eq(0).attr('href')
        let user = $('.row').find('.card').eq(0).find('.content').eq(0).find('a').eq(0).text()

        console.log(cardUrl)
        console.log(user)
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        let time = `${year}-${month}-${day}`
        request(cardUrl, function (error, response, body) {
            $ = cheerio.load(body)
            let result = []

            $('.post-entry').eq(0).find('a').each((index, elem) => {
                if (result.length >= MAX_COUNT) {
                    return
                }

                let item = {}
                result.push(item)

                item.title = $(elem).text().trim()
                item.time = time

                item.des = ''

                item.link = $(elem).attr("href")

                item.user = user

                item.see = '--'
                // console.log(item.link)
            })

            listener && listener.onResult(JSON.stringify(result))
        })
    });
}

if (require.main === module) {
    exports.get()
}