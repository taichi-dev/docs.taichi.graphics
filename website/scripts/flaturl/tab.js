const path = require('path')
const fs = require('fs-extra')
const matter = require('gray-matter');

const categoryUtils = require('./category')
const docUtils = require('./doc')

function generateTabContent(tabstr, activeKey, ignoreImport = false) {
  return `${ignoreImport ? "" : "import LinkTabs from '@theme/LinkTabs';"}

<LinkTabs values={${tabstr}} selectedValue='${activeKey}' />`
}

function replaceTabPlaceholder(id, content, tabstr) {
  const arr = content.split('\n')
  const reg = new RegExp(`^{{([\\s\\S]+?)}}$`, 'g')

  let ignoreImport = false
  let newcontent = ''
  for (const item of arr) {
    let normalized = item.trim()
    if (normalized.startsWith('{{')) {
      const match = reg.exec(normalized)
      if (match) {
        const t = match[1].trim()
        if (t === 'tab') {
          normalized = generateTabContent(tabstr, id, ignoreImport)
          ignoreImport = true
        }
      }
    }
    newcontent += '\n' + normalized
  }
  return newcontent
}

async function findTabAndReplace(frombase) {
  const tabCategories = await categoryUtils.readTabCategoryMetadata(frombase)
  for (const category of tabCategories) {
    let metadatas = await docUtils.getDocMetadata(path.dirname(category.source))
    metadatas = metadatas.sort((a, b) => a.sidebarPos - b.sidebarPos)
    const tabs = []
    for (const metadata of metadatas) {
      tabs.push({ value: metadata.id, label: metadata.title, href: metadata.slug })
    }
    const tabstr = JSON.stringify(tabs)
    for (const item of metadatas) {
      const body = replaceTabPlaceholder(item.id, item.body, tabstr)
      const data = matter.stringify(body, item.frontMatter)
      await fs.writeFile(item.source, data)
    }
    categoryUtils.writeToFile({
      label: category.metadata.label,
      position: category.metadata.position,
      collapsed: true,
      collapsible: false,
      className: category.metadata.className,
    }, category.source)
  }
}

module.exports = {
  findTabAndReplace
}