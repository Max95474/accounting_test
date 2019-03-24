'use strict'

const uuidv1 = require('uuid/v1');
const mutexify = require('mutexify')
const lock = mutexify()

let isInitialized = false
let instance

class AccountStorage {
  constructor() {
    this.balance = 0
    this.history = []
  }
  credit(amount) {
    return new Promise((resolve, reject) => {
      lock(release => {
        if(amount < 0) reject('Credit amount cannot be less then zero')

        this.balance += amount
        this.history.push({
          id: uuidv1(),
          type: 'credit',
          amount,
          effectiveDate: AccountStorage.getDate()
        })
        release()
        resolve()
      })
    })
  }
  async debit(amount) {
    return new Promise((resolve, reject) => {
      lock(release => {
        if(this.balance - amount < 0) reject('Not enough funds on balance')

        this.balance -= amount
        this.history.push({
          id: uuidv1(),
          type: 'debit',
          amount,
          effectiveDate: AccountStorage.getDate()
        })
        release()
        resolve()
      })
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