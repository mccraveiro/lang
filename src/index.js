const parser = require('./parser')
const transformer = require('./transformer')
const generator = require('./generator')

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
  const output = generator(JavascriptAST)

  return output
}

module.exports = {
  parse
}
