
const defaultOption = {
  name: 'taichi_inline_variable',
  data: {},
  fence: [ '{{', '}}' ],
  quiet: false,
  fail: true,
}

function withDefaultOption(options) {
  if (!options) return defaultOption
  return Object.assign({}, defaultOption, options)
}

function getFenceRegex(fence) {
  return new RegExp(`${fence[0]}([\\s\\S]+?)${fence[1]}`, 'g')
}

exports.withDefaultOption = withDefaultOption
exports.getFenceRegex = getFenceRegex
