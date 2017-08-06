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

    return `${this.arguments[0].value} ${symbols[this.name]} ${this.arguments[1].value}`
  }
}

module.exports = ExpressionStatement
