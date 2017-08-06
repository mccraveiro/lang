const lexer = require('./lexer')
const Program = require('./ast/program')

const compile = (sourcecode) => {
  const tokens = lexer(sourcecode)
  const AST = new Program(tokens)

  return AST.generate()
}

module.exports = {
  compile
}
