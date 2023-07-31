const validator = require('validator')

const getnotes = require('./notes')

const msg = getnotes()

console.log(msg)

console.log(validator.isURL('http://mead.io'))

