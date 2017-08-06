const parser = require('./parser')
const transformer = require('./transformer')

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
  const JavascriptAST = transformer(AST)

  let output = ''
  output += JavascriptAST.body[0].arguments[0].value
  output += ' '
  output += JavascriptAST.body[0].symbol
  output += ' '
  output += JavascriptAST.body[0].arguments[1].value
  output += '\n'

  return output
}

module.exports = {
  parse
}
