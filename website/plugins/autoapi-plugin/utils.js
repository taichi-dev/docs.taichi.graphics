const cheerio = require('cheerio');
const path = require('path')

const findnavs = ($, url, root) => {
  const sidebars = []
  const navs = root.find(' > li')
  if (navs.length === 0) return sidebars

  navs.map((_, v) => {
    const item = $(v)
    const _href = item.find(' > a').attr('href')
    const href = path.join(url, _href)
    const label = item.find(' > a').text().trim().replaceAll('\n', '').trim()
    const subroot = item.find(' > ul')
    const navitem = { href: href, label: label }
    if (subroot.length > 0) {
      const subnavs = findnavs($, url, subroot)
      navitem.items = subnavs
      navitem.type = 'category'
      navitem.collapsible = true
      navitem.collapsed = false
    } else {
      navitem.type = 'link'
    }
    sidebars.push(navitem)
  })
  return sidebars
}

const findToc = ($, root, level) => {
  const sidebars = []
  const navs = root.find(' > li')
  if (navs.length === 0) return sidebars
  navs.map((_, v) => {
    const item = $(v)
    const id = item.find(' > a').attr('href')
    const label = item.find(' > a').text().trim().replaceAll('\n', '').trim()
    const subroot = item.find(' > ul')
    const navitem = { value: label, id: id.substring(id.indexOf('#') + 1), level: level, children: [] }
    if (subroot.length > 0) {
      const subnavs = findToc($, subroot, level + 1)
      navitem.children = subnavs
    }
    sidebars.push(navitem)
  })
  return sidebars
}

const parseApi = (url, content) => {
  const $ = cheerio.load(content);
  const navs = $('#bd-docs-nav > .bd-toc-item > ul')
  const sidebars = findnavs($, url, navs)
  const toccontainer = $('#bd-toc-nav > ul')
  const tocs = findToc($, toccontainer, 0)
  // console.log(JSON.stringify(tocs, null, 2))
  return { sidebars, tocs }
}

module.exports = {
  parseApi
}