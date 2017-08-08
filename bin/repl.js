#! /usr/bin/env node

/* eslint-disable no-eval */

const repl = require('repl')
const { compile } = require('../src')

const evaluate = (cmd, context, filename, callback) => {
  const code = compile(cmd)
  const result = eval(code)
  callback(null, result)
}

repl.start({
  eval: evaluate,
})
