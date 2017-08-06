module.exports = (ast) => {
  const JavascriptAST = {
    type: 'Program',
    body: []
  }

  while (ast.body.length > 0) {
    const node = ast.body.shift()

    switch (node.name) {
      case 'add':
        JavascriptAST.body.push({
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
        JavascriptAST.body.push({
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

  return JavascriptAST
}
