#! /usr/bin/env node

const { readdirSync, readFileSync } = require('fs')
const { equal } = require('assert')
const { resolve } = require('path')
const { compile } = require('../src')

const encoding = 'utf-8'
const baseDirectory = resolve(__dirname, '../examples')

const listExamples = group =>
  readdirSync(`${baseDirectory}/${group}`, encoding)

const loadExample = (group, name) => ({
  input: readFileSync(`${baseDirectory}/${group}/${name}/input.lang`, encoding),
  output: readFileSync(`${baseDirectory}/${group}/${name}/output.js`, encoding),
})

// Success tests
listExamples('success')
  .forEach((example) => {
    const { input, output } = loadExample('success', example)
    const actualOutput = compile(input)

    equal(output, actualOutput, `Test name: ${example}`)
    process.stdout.write('.')
  })

process.stdout.write('\n')
