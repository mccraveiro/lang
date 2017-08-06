const lexer = require('./lexer')
const parser = require('./parser')
const transformer = require('./transformer')
const generator = require('./generator')

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
