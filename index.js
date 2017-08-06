#! /usr/bin/node

const { readFileSync } = require('fs')
const { parse } = require('./src')

const filepath = process.argv[2]
const sourcecode = readFileSync(filepath, 'utf-8')

const output = parse(sourcecode)
const result = eval(output)

console.log(result)
