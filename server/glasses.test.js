const request = require('supertest')
    , {expect} = require('chai')
    , db = require('APP/db')
    , app = require('./start')
    , Glasses = db.model('glasses')

/* global describe it before afterEach beforeEach */

describe('/api/glasses', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))
  beforeEach('Create new glasses', () => {
    Glasses.create({
      name: "gucci",
      color: "black",
      material: "metal",
      price: 300,
      description: "only for cool people",
      image: "https://dt66ikht21gkc.cloudfront.net/img/imgocchiali/2/img_art_GG0037O_001_A.jpg",
      quantity: 22
    })
    Glasses.create({
      name: "rayban",
      color: "silver",
      material: "plastic",
      price: 172,
      description: "only for marcos",
      image: "https://dt66ikht21gkc.cloudfront.net/img/imgocchiali/2/img_art_GG0037O_001_A.jpg",
      quantity: 7
    })
  }
  )

  describe('GET /', () =>
      it('sends back all glasses', () =>
        request(app)
          .get(`/api/glasses`)
          .expect(200)
          .then(res => {
            expect(res.body.length).to.equal(2)
            expect(res.body[0].name).to.equal('gucci')
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

  // describe('POST', () =>
  //     it('creates a user', () =>
  //       request(app)
  //         .post('/api/users')
  //         .send({
  //           email: 'beth@secrets.org',
  //           password: '12345'
  //         })
  //         .expect(201))

  //     it('redirects to the user it just made', () =>
  //       request(app)
  //         .post('/api/users')
  //         .send({
  //           email: 'eve@interloper.com',
  //           password: '23456',
  //         })
  //         .redirects(1)
  //         .then(res => expect(res.body).to.contain({
  //           email: 'eve@interloper.com'
  //         })))
  //   })
})
