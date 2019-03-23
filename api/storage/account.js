'use strict'

const uuidv1 = require('uuid/v1');

let isInitialized = false
let instance

class AccountStorage {
  constructor() {
    this.balance = 0
    this.history = []
  }
  async credit(amount) {
    if(amount < 0) throw new Error('Credit amount cannot be less then zero')

    this.balance += amount
    this.history.push({
      id: uuidv1(),
      type: 'credit',
      amount,
      effectiveDate: AccountStorage.getDate()
    })
  }
  async debit(amount) {
    if(this.balance - amount < 0) throw new Error('Not enough funds on balance')

    this.balance -= amount
    this.history.push({
      id: uuidv1(),
      type: 'debit',
      amount,
      effectiveDate: AccountStorage.getDate()
    })
  }
  async getBalance() {
    return this.balance
  }
  async getHistory() {
    return this.history
  }
  async findByID(id) {
    const transaction = this.history.find(tx => {
      return tx.id === id
    })
    return transaction
  }
  static getDate() {
    return new Date().toISOString()
  }
}

function getInstance() {
  if(isInitialized) {
    return instance
  } else {
    isInitialized = true
    instance = new AccountStorage()
    return instance
  }
}

module.exports = {
  getInstance
}