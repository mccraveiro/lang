#! /usr/bin/env node
/* eslint-disable no-eval, no-console */

const { readFileSync } = require('fs')
const { compile } = require('../src')

const filepath = process.argv[2]
const sourcecode = readFileSync(filepath, 'utf-8')

const output = compile(sourcecode)
const result = eval(output)

console.log(result)
