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

  generate() {
    const symbols = {
      add: '+',
      subtract: '-',
    }

    return this.body.map(
      node => `${node.arguments[0].value} ${symbols[node.name]} ${node.arguments[1].value}`
    ).join('\n')
  }
}

module.exports = BlockStatement
