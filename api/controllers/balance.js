'use strict'

const storage = require('../storage/account').getInstance()

async function getBalance(req, res) {
  const balance = await storage.getBalance()
  res.json({balance})
}

module.exports = {
  getBalance
}