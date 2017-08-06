const BlockStatement = require('./block-statement')

class Program {
  constructor (tokens) {
    this.body = new BlockStatement(tokens)
  }

  transform() {
    return this.body.transform()
  }
}

module.exports = Program
