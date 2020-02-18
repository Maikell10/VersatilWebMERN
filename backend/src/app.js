const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const Users = require('./routes/users')
//const Polizas = require('./routes/polizas')
require('dotenv').config()

//initializations
const app = express()
app.set('port', process.env.PORT || 3000)

//midlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(morgan('dev'))

//Global variables
app.use((req, res, next) => {
    next()
})

//routes
app.use('/users', Users)
//app.use('/polizas', Polizas)

module.exports = app