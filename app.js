const chalk = require ('chalk')

const getnotes = require('./notes')

const msg = getnotes()

console.log(chalk.green.bold.underline('Success'));
