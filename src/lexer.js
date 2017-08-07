const identifyToken = (token) => {
  const NAME = /^[a-zA-Z]+$/
  const DECLARATION = /^[a-zA-Z]+:$/
  const NUMBER = /^[0-9]+(\.[0-9]+)?$/

  if (token === '|>') {
    return [{
      type: 'pipe',
    }]
  }

  if (token.match(DECLARATION)) {
    return [{
      type: 'name',
      value: token.slice(0, -1),
    }, {
      type: 'colon',
    }]
  }

  if (token.match(NAME)) {
    return [{
      type: 'name',
      value: token,
    }]
  }

  if (token.match(NUMBER)) {
    return [{
      type: 'number',
      value: token,
    }]
  }

  throw new Error(`Unkown token ${token}`)
}

const lineLexer = sourcecode => {
  if (sourcecode.startsWith('#')) {
    return [{
      type: 'comment',
      value: sourcecode,
    }]
  }

  return sourcecode.split(' ')
    .filter(token => token.length > 0)
    .map(identifyToken)
    .reduce((tokens, results) => tokens.concat(results), [])
}

module.exports = sourcecode =>
  sourcecode.split('\n')
    .map(lineLexer)
    .reduce((tokens, line) => tokens.concat(line), [])

