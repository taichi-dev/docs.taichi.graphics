const path = require('path')
const fs = require('fs')

function tokenizer (prefix, baseUrl, quiet, fail, onError) {
  return function (eat, value, silent) {

    if (!value.startsWith('{{')) return

    const self = this
    const file = self.file
    const reg = new RegExp(`{{([\\s\\S]+?)}}`, 'g')
    const match = reg.exec(value)
    if (match) {
      const subvalue = match[0]
      let sub = match[1].trim()
      if (!sub || !sub.startsWith(prefix + '/')) {
        return
      }

      /* istanbul ignore if */
      if (silent) {
        return true
      }
      sub = sub.substring(prefix.length)
      const fileAbsPath = path.join(baseUrl, sub);
      let content
      const start = eat.now()
      const add = eat(subvalue)
      const end = eat.now()
      try {
        content = fs.readFileSync(fileAbsPath, 'utf8');
      } catch (e) {
        const message = 'Could not resolve fragment `' + fileAbsPath + '`'
        onError?.(message, start)
        if (!quiet) {
          if (fail) {
            return file.fail(message, start, 'fragment:undef-fragment')
          } else {
            file.message(message, start, 'fragment:undef-fragment')
          }
          return
        }
      }

      const children = self.tokenizeBlock(content.trim(), {})

      for (const item of children) {
        add(item)
      }
      return true
    }
  }
}

module.exports = tokenizer
