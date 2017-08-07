#! /usr/bin/node

const { readdirSync, readFileSync } = require('fs')
const { equal, throws } = require('assert')
const { compile } = require('./src')

const encoding = 'utf-8'
const examples = readdirSync('./examples/success', encoding)

examples.forEach((example) => {
  const input = readFileSync(`./examples/success/${example}/input.lang`, encoding)
  const output = readFileSync(`./examples/success/${example}/output.js`, encoding)
  const actualOutput = compile(input)

  equal(output, actualOutput, `Test name: ${example}`)
  process.stdout.write('.')
})

const failExamples = readdirSync('./examples/fail', encoding)

failExamples.forEach((example) => {
  const input = readFileSync(`./examples/fail/${example}/input.lang`, encoding)
  const output = readFileSync(`./examples/fail/${example}/output.js`, encoding)
  const doParse = () => compile(input)
  const expectedError = new RegExp(output.split('\n')[0])

  throws(doParse, expectedError, `Test name: ${example}`)
  process.stdout.write('.')
})

process.stdout.write('\n')
