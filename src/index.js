const lexer = sourcecode =>
  sourcecode.split(/\s+/)
    .filter(token => token.length > 0)
    .map(token =>
      isNaN(token)
      ? { type: 'function', value: token }
      : { type: 'number', value: token }
    )

const parse = (sourcecode) => {
  const tokens = lexer(sourcecode)
  const symbols = {
    add: '+',
    subtract: '-'
  }

  let output = ''
  output += tokens[1].value
  output += ' '
  output += symbols[tokens[0].value]
  output += ' '
  output += tokens[2].value
  output += '\n'

  return output
}

module.exports = {
  parse
}
