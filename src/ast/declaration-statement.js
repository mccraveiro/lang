const ExpressionStatement = require('./expression-statement')

class DeclarationStatement {
  constructor (tokens) {
    const nameToken = tokens.shift()

    if (nameToken.type !== 'name') {
      throw new Error('Expecting name declaration')
    }

    const colonToken = tokens.shift()

    if (colonToken.type !== 'colon') {
      throw new Error('Expecting colon')
    }

    this.name = nameToken.value
    this.expression = new ExpressionStatement(tokens)
  }

  generate () {
    return `const ${this.name} = ${this.expression.generate()};`
  }
}

module.exports = DeclarationStatement
