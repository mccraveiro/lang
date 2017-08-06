module.exports = (JavascriptAST) =>
  JavascriptAST.body
    .map(node => `${node.arguments[0].value} ${node.symbol} ${node.arguments[1].value}`)
    .join('\n')
    .concat('\n')
