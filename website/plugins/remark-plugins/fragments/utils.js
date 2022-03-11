
const defaultOption = {
  name: 'taichi_fragment',
  baseUrl: '',
  prefix: 'fragments',
  quiet: false,
  fail: true,
}

function withDefaultOption(options) {
  if (!options) return defaultOption
  return Object.assign({}, defaultOption, options)
}

function getRegex(fence) {
  return new RegExp(`${fence[0]}([\\s\\S]+?)${fence[1]}`, 'g')
}

exports.withDefaultOption = withDefaultOption
exports.getRegex = getRegex
