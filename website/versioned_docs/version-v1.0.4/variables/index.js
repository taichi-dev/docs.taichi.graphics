const _ = require('lodash')

const globalVariable = require('./global.json')

const versionVariable = require('./variable.json')

module.exports = _.merge(globalVariable, versionVariable)

