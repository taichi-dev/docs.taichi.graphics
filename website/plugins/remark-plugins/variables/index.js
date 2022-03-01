const visit = require('unist-util-visit')

const utils = require('./utils')
const tokenizer = require('./tokenizer')

function locator (opening) {
  return function (value, fromIndex) {
    return value.indexOf(opening, fromIndex)
  }
}

module.exports = function variable(options) {
  const { data, name, fence } = utils.withDefaultOption(options)
  const { inlineTokenizers, inlineMethods } = this.Parser.prototype
  inlineTokenizers[name] = tokenizer(name, data, fence, false, false)
  inlineMethods.splice(inlineMethods.indexOf('url'), 0, name)
  inlineTokenizers[name].locator = locator(fence[0])
  function visitor(node) {
    const reg = utils.getFenceRegex(fence)
    if (node.url) {
      node.url = node.url.replace(reg, function(match, escapeValue){
        if (escapeValue && escapeValue.startsWith('var.')) {
          escapeValue = escapeValue.substring(4)
          if (data[escapeValue]) {
            return data[escapeValue]
          }
        }
        return match
      })
    }
  }

  return function(tree) {
    visit(tree, ['link', 'linkReference'], visitor);
  }
}