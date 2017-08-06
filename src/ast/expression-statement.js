const NumberLiteral = require('./number-literal')

class ExpressionStatement {
  constructor(tokens) {
    const currentToken = tokens.shift()

    this.arguments = []

    if (currentToken.type === 'name') {
      this.type = 'CallExpression'
      let argumentA
      let argumentB

      switch (currentToken.value) {
        case 'add':
        case 'subtract':
          this.name = currentToken.value

          argumentA = tokens.shift()
          argumentB = tokens.shift()

          if (argumentA.type === 'number' && !argumentB) {
            tokens.unshift(argumentA)
            this.arguments.push(new NumberLiteral(tokens))
          } else if (argumentA.type === 'number' && argumentB.type === 'number') {
            tokens.unshift(argumentB)
            tokens.unshift(argumentA)
            this.arguments.push(new NumberLiteral(tokens))
            this.arguments.push(new NumberLiteral(tokens))
          } else if (argumentA.type === 'number' && argumentB.type === 'name') {
            tokens.unshift(argumentB)
            tokens.unshift(argumentA)
            this.arguments.push(new NumberLiteral(tokens))
            this.arguments.push(new ExpressionStatement(tokens))
          } else if (argumentA.type === 'number' && argumentB.type === 'pipe') {
            tokens.unshift(argumentB)
            tokens.unshift(argumentA)
            this.arguments.push(new NumberLiteral(tokens))
          } else {
            throw new Error(`${currentToken.value} should receive two numbers as arguments`)
          }

          break
      }
    } else if (currentToken.type === 'pipe') {
      this.type = 'PipeExpression'
    } else {
      throw new Error(`unexpected token ${currentToken.type}`)
    }
  }

  generate() {
    const symbols = {
      add: '+',
      subtract: '-',
    }

    return `${this.arguments[0].generate()} ${symbols[this.name]} ${this.arguments[1].generate()}`
  }
}

module.exports = ExpressionStatement
