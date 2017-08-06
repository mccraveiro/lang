const ExpressionStatement = require('./expression-statement')

class BlockStatement {
  constructor (tokens) {
    this.body = []

    while (tokens.length > 0) {
      this.body.push(new ExpressionStatement(tokens))
    }
  }

  generate() {
    return this.body.map(expression => expression.generate()).join('\n')
  }
}

module.exports = BlockStatement
