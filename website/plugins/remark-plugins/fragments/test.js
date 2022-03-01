
const remark = require('remark')
const remarkParse = require('remark-parse')

const fragmentPlugin = require('./index')

const markdown = `
# Hello world


{{fragment/test.md}}


dsaewfff {{ var.xxx }} {{var.title}}

[affwaefee {{ var.title }}](saewfwafwae/{{var.title}}{{var.version}})

- {{var.title}}
`

// const markdown = "```\n{{var.title}}\n```"

remark()
  .use(remarkParse)
  .use(fragmentPlugin, { baseUrl:  __dirname + '/fragment' })
  .process(markdown, function (error, result) {
    console.log(error)
    console.log(result.toString())
  })