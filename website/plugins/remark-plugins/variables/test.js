
// import * as remark from 'remark'
const remark = require('remark')
const remarkParse = require('remark-parse')

const variablePlugin = require('./index')

const markdown = `
# Hello world

dsaewfff {{ var.xxx }} {{var.title}}

[affwaefee {{ var.title }}](saewfwafwae/{{var.title}}{{var.version}})

- {{var.title}}
`

// const markdown = "```\n{{var.title}}\n```"

remark()
  .use(remarkParse)
  .use(variablePlugin, { data: { title: 'vvv' } })
  .process(markdown, function (error, result) {
    console.log(error)
    console.log(result.toString())
  })