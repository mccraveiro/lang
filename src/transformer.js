module.exports = ast => ({
  type: 'Program',
  body: ast.transform()
})
