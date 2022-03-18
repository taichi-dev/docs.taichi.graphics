const tokenizer = require('./tokenizer')
const utils = require('./utils')

module.exports = function(options) {
  const { prefix, baseUrl, name, quiet, fail, onError } = utils.withDefaultOption(options)
  const parser = this.Parser
  const { blockTokenizers, blockMethods, interruptParagraph } = parser.prototype
  blockTokenizers[name] = tokenizer(prefix, baseUrl, quiet, fail, onError)
  blockMethods.splice(blockMethods.indexOf('newline') + 1, 0, name)
  interruptParagraph.unshift([name])
  blockTokenizers[name].notInLink = true
}