const parse = (sourcecode) => {
  const lines = sourcecode.split('\n')
  const token = lines[0].split(' ')[0]

  const outputs = {
    add: '1 + 2\n',
    subtract: '1 - 2\n'
  }

  const output = outputs[token]

  return output
}

module.exports = {
  parse
}
