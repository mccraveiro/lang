class ExpressionStatement {
  constructor(tokens) {
    const currentToken = tokens.shift()

    this.arguments = []

    if (currentToken.type === 'function') {
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
            this.arguments.push({
              type: 'NumberLiteral',
              value: argumentA.value
            })
          } else if (argumentA.type === 'number' && argumentB.type === 'number') {
            this.arguments.push({
              type: 'NumberLiteral',
              value: argumentA.value
            })

            this.arguments.push({
              type: 'NumberLiteral',
              value: argumentB.value
            })
          } else if (argumentA.type === 'number' && argumentB.type === 'function') {
            this.arguments.push({
              type: 'NumberLiteral',
              value: argumentA.value
            })

            tokens.unshift(argumentB)
            this.arguments.push(new ExpressionStatement(tokens))
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

    const output = `${this.arguments[0].value} ${symbols[this.name]}`

    if (
      this.arguments[0].type === 'NumberLiteral' &&
      this.arguments[1].type === 'NumberLiteral'
    ) {
      return `${output} ${this.arguments[1].value}`
    } else {
      return `${output} ${this.arguments[1].generate()}`
    }
  }
}

module.exports = ExpressionStatement
