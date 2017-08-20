class NumberLiteral {
  constructor (tokens) {
    const token = tokens.shift()

    if (token.type !== 'number') {
      throw new Error(`${token} is not a number`)
    }

    this.value = token.value
  }

  generate () {
    return this.value
  }
}

module.exports = NumberLiteral
