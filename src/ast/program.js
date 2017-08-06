const BlockStatement = require('./block-statement')

class Program {
  static parser(tokens) {
    return {
      type: 'Program',
      body: BlockStatement.parser(tokens),
    }
  }
}

module.exports = Program
