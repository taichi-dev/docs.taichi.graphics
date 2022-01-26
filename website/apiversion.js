const shell = require('shelljs')
const fs = require('fs')
const path = require('path')

const writeFile = (file, data) => {
  fs.writeFileSync(file, data)
}

const getDefaultVersion = () => {
  const v = shell.exec('cd $TAICHI_PATH && git describe --tags --abbrev=0').stdout.trim()
  if (v.startsWith('v')) {
    writeFile(path.join(__dirname, '/apiversion.json'), `{"current":"${v}"}`)
  }
}

getDefaultVersion()