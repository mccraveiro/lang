#! /usr/bin/env node
/* eslint-disable no-eval, no-console */

const repl = require('repl')
const { readFileSync } = require('fs')
const { compile } = require('../src')

const filepath = process.argv[2]

if (filepath) {
  const sourcecode = readFileSync(filepath, 'utf-8')
  const output = compile(sourcecode)
  const result = eval(output)

  console.log(result)
  process.exit(0)
}

const evaluate = (cmd, context, filename, callback) => {
  const code = compile(cmd)
  const result = eval(code)
  callback(null, result)
}

repl.start({
  eval: evaluate,
})
