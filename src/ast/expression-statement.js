class ExpressionStatement {
  constructor(tokens) {
    const currentToken = tokens.shift()

    this.type = 'CallExpression'
    this.arguments = []

    if (currentToken.type === 'function') {
      let argumentA
      let argumentB

      switch (currentToken.value) {
        case 'add':
          this.name = 'add'

          argumentA = tokens.shift()
          argumentB = tokens.shift()

          if (argumentA.type === 'number' && argumentB.type === 'number') {
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
            throw 'add should receive two numbers as arguments'
          }

          break

        case 'subtract':
          this.name = 'subtract'

          argumentA = tokens.shift()
          argumentB = tokens.shift()

          if (argumentA.type === 'number' && argumentB.type === 'number') {
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
            throw 'subtract should receive two numbers as arguments'
          }

          break
      }
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
