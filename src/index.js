const parser = require('./parser')

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
  const AST = parser(tokens)

  const symbols = {
    add: '+',
    subtract: '-'
  }

  let output = ''
  output += AST.body[0].arguments[0].value
  output += ' '
  output += symbols[AST.body[0].name]
  output += ' '
  output += AST.body[0].arguments[1].value
  output += '\n'

  return output
}

module.exports = {
  parse
}
