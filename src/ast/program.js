const BlockStatement = require('./block-statement')

class Program {
  constructor (tokens) {
    this.body = new BlockStatement(tokens)
  }

  generate () {
    return this.body.generate().concat('\n')
  }
}

module.exports = Program
