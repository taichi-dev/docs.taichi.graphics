module.exports = tokenizer

function tokenizer (name, datafunc, fence, quiet, fail, onError) {
  return function (eat, value, silent) {

    if (!value.startsWith(fence[0])) return

    const self = this
    const file = self.file
    const reg = new RegExp(`${fence[0]}([\\s\\S]+?)${fence[1]}`, 'g')
    const match = reg.exec(value)
    if (match) {
      const subvalue = match[0]
      let sub = match[1].trim()
      if (!sub || !sub.startsWith('var.')) {
        return
      }

      sub = sub.substring(4)
      const data = datafunc(file.path, file.cwd)
      const fromData = data[sub]

      const found = fromData
      const now = eat.now()

      /* istanbul ignore if */
      if (silent) {
        return true
      }

      const add = eat(subvalue)
      if (found != null) {
        const tokenized = self.tokenizeInline(found.toString(), now)
        let i = -1
        let node
        while (++i < tokenized.length) {
          node = add(tokenized[i])
        }
        return node
      }
      if (!found && !quiet) {
        sub = sub.indexOf('.') === 0 ? sub : '.' + sub
        const message = 'Could not resolve `var' + sub + '`'
        onError?.(message, now)
        if (fail) {
          return file.fail(message, now, 'variables:undef-variable')
        } else {
          file.message(message, now, 'variables:undef-variable')
        }
      }

      return add({
        type: name,
        value: subvalue
      })
    }
  }
}
