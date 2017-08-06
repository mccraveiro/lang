const Program = require('./ast/program')

module.exports = tokens => new Program(tokens)
