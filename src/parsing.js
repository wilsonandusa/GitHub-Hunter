var Crawler = require('crawler')

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

c.queue([
  'https://github.com/showcases/programming-languages'
])
