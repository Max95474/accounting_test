'use strict'

const storage = require('../storage/account').getInstance()

async function getTransactionsHistory(req, res) {
  const history = await storage.getHistory()
  res.json(history)
}

async function commitNewTransaction(req, res) {
  const {type, amount} = req.body

  if(type === 'credit') {
    return storage.credit(amount)
      .then(() => res.status(200).json({message: 'OK'}))
      .catch(err => res.status(406).json({message: err.message}))
  } else if(type === 'debit') {
    return storage.debit(amount)
      .then(() => res.status(200).json({message: 'OK'}))
      .catch(err => res.status(406).json({message: err.message}))
  } else {
    return res.status(405).json({message: 'Not allowed transaction type'})
  }
}

async function getTransactionByID(req, res) {
  const transactionID = req.params.id
  const transaction = await storage.findByID(transactionID)
  if(transaction) {
    res.status(200).json(transaction)
  } else {
    res.status(404).json({message: 'Transaction not found'})
  }
}

module.exports = {
  getTransactionsHistory,
  commitNewTransaction,
  getTransactionByID
}