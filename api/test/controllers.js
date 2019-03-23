'use strict'

const should = require('should');
const request = require('supertest');

let app, agent

before(done => {
  app = require('../app');
  agent = request.agent(app);
  app.on("appStarted", () => done());
});

describe('Controllers', () => {
  describe('Transaction', () => {
    describe('Get transaction history', () => {
      it('should transaction history', () => {
        return agent
          .get('/transaction')
          .expect(200)
          .then(res => res.body.should.be.an.instanceOf(Array).with.lengthOf(0))
      })
    })
    describe('Commit credit transaction', () => {
      it('should commit new credit transaction', () => {
        return agent
          .post('/transaction')
          .send({
            type: 'credit',
            amount: 100
          })
          .expect(200)
          .then(res => res.body.should.have.property('message', 'OK'))
      })
    })
    describe('Commit debit transaction', () => {
      it('should commit new debit transaction', () => {
        return agent
          .post('/transaction')
          .send({
            type: 'debit',
            amount: 100
          })
          .expect(200)
          .then(res => res.body.should.have.property('message', 'OK'))
      })
      it('should respond with status 406', () => {
        return agent
          .post('/transaction')
          .send({
            type: 'debit',
            amount: 100
          })
          .expect(406)
      })
    })
    describe('Get transaction by id', () => {
      it('should return transaction by id', async () => {
        const transactionID = await agent.get('/transaction').then(res => res.body[0].id)
        console.log(transactionID)
        return agent
          .get(`/transaction/${transactionID}`)
          .expect(200)
          .then(res => {
            console.log(res.body)
            res.body.should.be.an.instanceOf(Object)
          })
      })
      it('should respond with status 404', () => {
        return agent
          .get('/transaction/123')
          .expect(404)
      })
    })
  })
  describe('Balance', () => {
    describe('Return balance', () => {
      it('should return balance value', () => {
        return agent
          .get('/balance')
          .expect(200)
          .then(res => res.body.should.have.property('balance'))
      })
    })
  })
})
