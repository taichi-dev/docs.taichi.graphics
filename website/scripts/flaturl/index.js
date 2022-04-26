const docutils = require('./doc')
const tabutils = require('./tab')

const myArgs = process.argv.slice(2);
let frombase = './docs'
let tobase = './docs'
let baseurl = '/lang/articles'
if (myArgs.length >= 1) {
  frombase = myArgs[0]
}
if (myArgs.length >= 2) {
  tobase = myArgs[1]
}

if (myArgs.length >= 3) {
  baseurl = myArgs[2]
}

async function flatUrl(frombase, tobase, baseurl) {
  const metadatas = await docutils.getDocMetadata(frombase)
  for (const metadata of metadatas) {
    const n = docutils.flatUrl(metadata, baseurl)
    await docutils.writeDoc(n, frombase, tobase)
  }
}

flatUrl(frombase, tobase, baseurl).then(() => {
  tabutils.findTabAndReplace(frombase)
})