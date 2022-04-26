const visit = require('unist-util-visit')

const utils = require('./utils')
const tokenizer = require('./tokenizer')

function locator (opening) {
  return function (value, fromIndex) {
    return value.indexOf(opening, fromIndex)
  }
}

module.exports = function variable(options) {
  const { data: datafunc, name, fence, quiet, fail, onError } = utils.withDefaultOption(options)
  const { inlineTokenizers, inlineMethods } = this.Parser.prototype
  inlineTokenizers[name] = tokenizer(name, datafunc, fence, quiet, fail, onError)
  inlineMethods.splice(inlineMethods.indexOf('url'), 0, name)
  inlineTokenizers[name].locator = locator(fence[0])
  function visitor(node, vfile) {
    const reg = utils.getFenceRegex(fence)
    if (node.url) {
      const data = datafunc(vfile.path, vfile.cwd)
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