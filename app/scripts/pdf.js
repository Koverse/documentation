const markdownpdf = require('markdown-pdf')
const jdown = require('jdown')
const api = require('../public/api.json')

jdown('../user-guide', { parseMd: false }).then((userGuide) => {
  const markdownStrings = []
  Object.keys(userGuide).sort().forEach((key) => {
    const section = userGuide[key]
    Object.keys(section).sort().forEach((page) => {
      markdownStrings.push(section[page].contents)
    })
  })
  markdownpdf().concat.from.strings(markdownStrings).to(`./public/koverse-${api.info.version}.pdf`)
})
