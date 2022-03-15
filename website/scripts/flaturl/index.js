const docutils = require('./doc')
const tabutils = require('./tab')

async function flatUrl(frombase, tobase, baseurl) {
  const metadatas = await docutils.getDocMetadata(frombase)
  for (const metadata of metadatas) {
    const n = docutils.flatUrl(metadata, baseurl)
    await docutils.writeDoc(n, frombase, tobase)
  }
}

flatUrl('./docs', './docs', '/lang/articles').then(() => {
  tabutils.findTabAndReplace('./docs')
})