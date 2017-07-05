var Crawler = require('crawler')
var shell = require('electron').shell

// document.getElementById('programming-languages-btn').onclick =
crawlingOneUrl('https://github.com/showcases/programming-languages')


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
          reposNames[i] = $(this).find('h3').find('a').text().replace(/\s/g, '')
          reposLinks[i] = 'https://github.com/' + $(this).find('h3').find('a').text().replace(/\s/g, '')
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
          // set up info rows
          var topRow = document.createElement('div')
          var buttonRow = document.createElement('div')
          topRow.className = 'row'
          buttonRow.className = 'row'
          topRow.style.margin = '5px'
          // set up repos two info rows
          var rightDiv = document.createElement('div')
          rightDiv.style.marginLeft = '5px'
          var nameBar = document.createElement('div')
          nameBar.className = 'middle_box_info_row_name'
          var starForkBar = document.createElement('div')
          starForkBar.className = 'middle_box_info_row_star_fork'


          // setup repos Name
          var name = document.createElement('a')
          name.innerHTML = reposNames[i]
          name.id = i
          name.addEventListener('click', function () {
            shell.openExternal(reposLinks[this.id])
          })
          nameBar.appendChild(name)
          starForkBar.innerHTML = 'Star: ' + reposStar[i] +
           ' ' + 'Fork:' + reposFork[i]
          rightDiv.appendChild(nameBar)
          rightDiv.appendChild(starForkBar)

          var boxList = document.getElementById('showcase')
          var box = document.createElement('div')
          box.className = 'middle_button_box'

          // setUp icon
          var boxIcon = document.createElement('div')
          boxIcon.className = 'middle_box_icon'
          boxIcon.style.backgroundImage = "url('" + reposImg[i] + "')"

          topRow.appendChild(boxIcon)
          topRow.appendChild(rightDiv)

          box.appendChild(topRow)
          box.appendChild(buttonRow)

          // append box elements
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
