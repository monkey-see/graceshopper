const request = require('supertest')
    , {expect} = require('chai')
    , db = require('APP/db')
    , app = require('./start')
    , Review = db.model('reviews')
    , User = db.model('users')
    , Glasses = db.model('glasses')

/* global describe it before afterEach beforeEach */

describe('/api/reviews', () => {
  before('Await database sync', () => db.didSync)
  // afterEach('Clear the tables', () => db.truncate({ cascade: true }))
  beforeEach('Create new associations', () => {
    Review.create({
      text: "awful",
      rating: 1
    })
    Review.create({
      text: "great",
      rating: 2
    })
    User.create({
      name: 'bob',
      email: 'beth@secrets.org',
      password: '12345'
    })
    Glasses.create({
      name: "gucci",
      color: "black",
      material: "metal",
      price: 300,
      description: "only for cool people",
      image: "https://dt66ikht21gkc.cloudfront.net/img/imgocchiali/2/img_art_GG0037O_001_A.jpg",
      quantity: 22
    })
  }
  )

  describe('POST /', () =>
      it('creates a new review', () =>
        request(app)
          .post(`/api/reviews`)
          .send({
            text: "amazing",
            rating: 3,
            userId: 1,
            glassesId: 1
          })
          .expect(200)
          .then(res => {
            expect(res.body.text).to.equal('amazing')
            expect(res.body.user_id).to.equal(1)
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
