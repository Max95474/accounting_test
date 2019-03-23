'use strict'

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const config = require('config')

const routes = require('./routes')

const {host, port} = config.get('server')

const app = express()


app.use(bodyParser.json());
app.use(morgan('dev'))
app.use(cors())

app.use(routes.transactionRoutes())
app.use(routes.balanceRoutes())

app.listen(
  port,
  host,
  () => {
    console.log(`Server is listening on port ${port}...`)
    app.emit('appStarted')
  }
)

module.exports = app;