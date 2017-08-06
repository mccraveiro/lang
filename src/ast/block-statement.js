const ExpressionStatement = require('./expression-statement')

class BlockStatement {
  constructor (tokens) {
    this.body = []

    while (tokens.length > 0) {
      this.body.push(new ExpressionStatement(tokens))
    }

    for (let i = 0; i < this.body.length; i++) {
      const expression = this.body[i]

      if (expression.type === 'PipeExpression') {
        const argument = this.body[i - 1]
        // remove operator and argument
        this.body.splice(--i, 2)
        this.body[i].arguments.unshift(argument)
      }
    }
  }

  generate() {
    return this.body.map(expression => expression.generate()).join('\n')
  }
}

module.exports = BlockStatement
