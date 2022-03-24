const docutils = require('./doc')
const tabutils = require('./tab')

const myArgs = process.argv.slice(2);
let baseurl = './.flatdocs'
if (myArgs.length >= 1) {
  baseurl = myArgs[0]
}

async function flatUrl(frombase, tobase, baseurl) {
  const metadatas = await docutils.getDocMetadata(frombase)
  for (const metadata of metadatas) {
    const n = docutils.flatUrl(metadata, baseurl)
    await docutils.writeDoc(n, frombase, tobase)
  }
}

flatUrl(baseurl, baseurl, '/lang/articles').then(() => {
  tabutils.findTabAndReplace(baseurl)
})