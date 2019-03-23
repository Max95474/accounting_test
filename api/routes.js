'use strict'

const Router = require('express-promise-router');

const transaction = require('./controllers/transaction')
const balance = require('./controllers/balance')

function transactionRoutes() {
  const router = Router();

  router.route('/transaction')
    .get(transaction.getTransactionsHistory)
    .post(transaction.commitNewTransaction)

  router.route('/transaction/:id')
    .get(transaction.getTransactionByID)

  return router
}

function balanceRoutes() {
  const router = Router()

  router.route('/balance')
    .get(balance.getBalance)

  return router
}

module.exports = {
  transactionRoutes,
  balanceRoutes
}