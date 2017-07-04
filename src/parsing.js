var Crawler = require('crawler')

// document.getElementById('programming-languages-btn').onclick =
// crawlingOneUrl('https://github.com/showcases/programming-languages')


function crawlingOneUrl (url) {
  var start = Date.now()
  var c = new Crawler({
    maxConnections: 10,
    callback: function (error, res, done) {
      if (error) {
        console.log(error)
      } else {
        var reposNames = []
        var reposLinks = []
        var reposImg = []
        var reposInfo = []
        var reposFork = []
        var reposStar = []
        var reposLang = []
        var $ = res.$
        $('.repo-list-item-with-avatar').each(function (i, elem) {
          reposNames[i] = $(this).find('h3').find('a').find('span').text().replace(/\s/g, '')
          reposLinks[i] = 'https://github.com' + $(this).find('h3').find('a').text().replace(/\s/g, '')
          reposImg[i] = $(this).find('img').attr('src')
          reposInfo[i] = $(this).find('div').find('div').text()
          $(this).find('div > a').each(function (index, element) {
            if ($(element).find('svg').attr('aria-label') === 'star') {
              reposStar[i] = $(element).text().replace(/\s/g, '')
            } else {
              reposFork[i] = $(element).text().replace(/\s/g, '')
            }
          })
          $(this).find('div > span > span').each(function (index, element) {
            if ($(element).attr('class') === 'mr-3') {
              reposLang[i] = $(element).text().replace(/\s/g, '')
            } else {
              reposLang[i] = 'undefined'
            }
          })
        })

        for (var i = 0; i < reposNames.length; i++) {
          // reposNames[i]
          var boxList = document.getElementById('showcase')
          var box = document.createElement('div')
          box.className = 'middle_button_box'
          // setUp
          boxList.appendChild(box)
        }
        // console.log(reposNames)
        // console.log(reposLinks)
        // console.log(reposImg)
        // console.log(reposInfo)
        // console.log(reposFork)
        // console.log(reposStar)
        // console.log(reposLang)
        var end = Date.now()
        console.log(end - start)
      }
      done()
    }
  })
  c.queue([
    url
  ])
}

function crawlingUrls (urlArray) {
  var c = new Crawler({
    maxConnections: 10,
    callback: function (error, res, done) {
      if (error) {
        console.log(error)
      } else {
        var $ = res.$
        console.log($('title').text())
      }
      done()
    }
  })
  c.queue(urlArray)
}
// function log() {
//   console.log('hahahahha')
// }
// module.exports = log;
