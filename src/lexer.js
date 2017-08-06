module.exports = sourcecode =>
  sourcecode.split(/\s+/)
    .filter(token => token.length > 0)
    .map((token) => {
      if (token === '|>') {
        return { type: 'pipe' }
      }

      if (isNaN(token)) {
        return { type: 'function', value: token }
      } else {
        return { type: 'number', value: token }
      }
    })

