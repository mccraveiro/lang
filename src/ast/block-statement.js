class BlockStatement {
  constructor (tokens) {
    const expressions = []

    while (tokens.length > 0) {
      const currentToken = tokens.shift()

      if (currentToken.type === 'function') {
        let expression
        let argumentA
        let argumentB

        switch (currentToken.value) {
          case 'add':
            expression = {
              type: 'CallExpression',
              name: 'add',
              arguments: []
            }

            argumentA = tokens.shift()
            argumentB = tokens.shift()

            if (argumentA.type === 'number' && argumentB.type === 'number') {
              expression.arguments.push({
                type: 'NumberLiteral',
                value: argumentA.value
              })

              expression.arguments.push({
                type: 'NumberLiteral',
                value: argumentB.value
              })

              expressions.push(expression)
            } else {
              throw 'add should receive two numbers as arguments'
            }

            break

          case 'subtract':
            expression = {
              type: 'CallExpression',
              name: 'subtract',
              arguments: []
            }

            argumentA = tokens.shift()
            argumentB = tokens.shift()

            if (argumentA.type === 'number' && argumentB.type === 'number') {
              expression.arguments.push({
                type: 'NumberLiteral',
                value: argumentA.value
              })

              expression.arguments.push({
                type: 'NumberLiteral',
                value: argumentB.value
              })

              expressions.push(expression)
            } else {
              throw 'subtract should receive two numbers as arguments'
            }

            break
        }
      }
    }

    this.body = expressions
  }

  transform() {
    const body = []

    while(this.body.length > 0) {
      const node = this.body.shift()

      switch (node.name) {
        case 'add':
          body.push({
            type: 'BinaryExpression',
            symbol: '+',
            arguments: [
              {
                type: 'NumberLiteral',
                value: node.arguments[0].value
              },
              {
                type: 'NumberLiteral',
                value: node.arguments[1].value
              }
            ]
          })

          break
        case 'subtract':
          body.push({
            type: 'BinaryExpression',
            symbol: '-',
            arguments: [
              {
                type: 'NumberLiteral',
                value: node.arguments[0].value
              },
              {
                type: 'NumberLiteral',
                value: node.arguments[1].value
              }
            ]
          })

          break
      }
    }

    return body
  }
}

module.exports = BlockStatement
