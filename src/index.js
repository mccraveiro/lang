const prettier = require('prettier')
const lexer = require('./lexer')
const Program = require('./ast/program')

const compile = (sourcecode) => {
  const tokens = lexer(sourcecode)
  const AST = new Program(tokens)
  const code = AST.generate()

  return prettier.format(code, {
    semi: false,
  })
}

module.exports = {
  compile,
}
