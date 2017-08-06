#! /usr/bin/node

const { readdirSync, readFileSync } = require('fs')
const { equal } = require('assert')
const { parse } = require('./src')

const encoding = 'utf-8'
const examples = readdirSync('./examples', encoding)

examples.forEach((example) => {
  const input = readFileSync(`./examples/${example}/input.lang`, encoding)
  const output = readFileSync(`./examples/${example}/output.js`, encoding)
  const actualOutput = parse(input)

  equal(output, actualOutput)
  console.log('.')
})
