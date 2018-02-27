const path = require('path')
const { exec, fork } = require('child_process')
const chalk = require('chalk')
const readline = require('readline')
const log = console.log

const divider = chalk.gray('\n-----------------------------------')

const { pages, symbols } = require(path.resolve(
  __dirname,
  '../../config/build.conf'
))

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question(
  `
${chalk.bold('Which modules would you want to start?')}${divider}
${pages
    .map(
      (page, index) =>
        `${chalk.cyan.bold(page.symbol)}: ${chalk.bold(
          `${page.name} - [page]`
        )} ${pages.length - 1 !== index ? '\n' : ''}`
    )
    .join('')}
${chalk.blue.bold('md1')}: ${chalk.bold('console - [module]')}
${chalk.blue.bold('md2')}: ${chalk.bold('website - [module]')}
${chalk.red.bold('md3')}: ${chalk.bold('all - [module]')}${divider}
Type In Symbol: `,
  input => {
    let exist = false

    symbols.forEach(symbol => {
      if (symbol === input) exist = true
    })

    if (!exist) {
      log(`
${chalk.red.bold('Symbol Not Exist')}
       `)
      process.exit(0)
    }

    log(`
${chalk.blue.bold('Waiting For Server Start...')}
     `)

    fork('./index.js', ['-x', input])

    rl.close()
  }
)
