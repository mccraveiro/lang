const identifyToken = (token) => {
  const NAME = /^[a-zA-Z]+$/
  const NUMBER = /^[0-9]+(\.[0-9]+)?$/

  if (token === '|>') {
    return {
      type: 'pipe'
    }
  }

  if (token.match(NAME)) {
    return {
      type: 'name',
      value: token
    }
  }

  if (token.match(NUMBER)) {
    return {
      type: 'number',
      value: token
    }
  }

  throw new Error(`Unkown token ${token}`)
}

const lineLexer = sourcecode =>
  sourcecode.split(' ')
    .filter(token => token.length > 0)
    .map(identifyToken)

module.exports = sourcecode =>
  sourcecode.split('\n')
    .map(lineLexer)
    .reduce((tokens, line) => tokens.concat(line), [])

