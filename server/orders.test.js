const request = require('supertest')
    , {expect} = require('chai')
    , db = require('APP/db')
    , app = require('./start')
    , Order = db.model('orders')
    , User = db.model('users')
    , Glasses = db.model('glasses')

/* global describe it before afterEach beforeEach */

describe('/api/orders', () => {
  before('Await database sync', () => db.didSync)
  // afterEach('Clear the tables', () => db.truncate({ cascade: true }))
  beforeEach('Create new associations', () => {
    Order.create({
      glasses: [{}, {}, {}, {}]
    })
  }
  )

  describe('GET /', () =>
      it('sends all orders', () =>
        request(app)
          .get(`/api/orders`)
          .expect(200)
          .then(res => {
            expect(res.body.length).to.equal(1)
            expect(res.body[0].glasses.length).to.equal(4)
          })
      ))

  describe('GET /color/:color', () =>
      it('sends back all glasses of the color param', () =>
        request(app)
          .get(`/api/glasses/color/black`)
          .expect(200)
          .then(res => {
            expect(res.body.length).to.equal(1)
            expect(res.body[0].color).to.equal('black')
          })
      )
    )
})
