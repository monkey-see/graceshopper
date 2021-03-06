'use strict'

const db = require('APP/db')
    , {User, Season, Glasses, Order, Review, Promise, GlassesOrders} = db
    , {mapValues} = require('lodash')

function seedEverything() {
  const seeded = {
    users: users(),
    seasons: seasons(),
    glasses: glasses()
  }

  seeded.orders = orders(seeded)
  seeded.reviews = reviews(seeded)
  seeded.GlassesOrders = glassesOrdersTable(seeded)

  return Promise.props(seeded)
}

const users = seed(User, {
  danny: {
    email: 'danny@email.com',
    name: 'Danny',
    password: 'test',
    isAdmin: true
  },
  marcos: {
    email: 'marcos@email.com',
    name: 'Marcos',
    password: 'test',
    isAdmin: true
  },
  natasha: {
    email: 'natasha@email.com',
    name: 'Natasha',
    password: 'test',
    isAdmin: true
  },
  pim: {
    email: 'pim@email.com',
    name: 'Pim',
    password: 'test',
    isAdmin: true
  },
  user: {
    email: 'user@email.com',
    name: 'User',
    password: 'test',
    isAdmin: false
  }
})

const seasons = seed(Season, {
  winter: {
    season: 'winter'
  },
  spring: {
    season: 'spring'
  },
  summer: {
    season: 'summer'
  },
  fall: {
    season: 'fall'
  }
})

const glasses = seed(Glasses, {
  daniel: {
    name: 'Daniel',
    color: 'black',
    material: 'metal',
    price: 10000,
    description: `You'll look totally scholarly in these specs.`,
    image: 'http://i.imgur.com/3NOvG4t.png',
    quantity: 17,
    season_id: 1
  },
  marcos: {
    name: 'Marcos',
    color: 'blue',
    material: 'metal',
    price: 25000,
    description: `You'll look totally fancy in these specs.`,
    image: 'http://i.imgur.com/EsO3iMd.jpg',
    quantity: 4,
    season_id: 1
  },
  natasha: {
    name: 'Natasha',
    color: 'blue',
    material: 'acetate',
    price: 17500,
    description: `You'll look totally rad in these specs.`,
    image: 'http://i.imgur.com/xIOvGWa.png',
    quantity: 59,
    season_id: 1
  },
  pim: {
    name: 'Pim',
    color: 'multi',
    material: 'acetate',
    price: 15000,
    description: `You'll look totally librarian in these specs.`,
    image: 'http://i.imgur.com/XOqM5AE.png',
    quantity: 31,
    season_id: 2
  },
  omri: {
    name: 'Omri',
    color: 'pink',
    material: 'acetate',
    price: 21000,
    description: `You'll look totally heroic in these specs.`,
    image: 'http://i.imgur.com/u9I91HD.png',
    quantity: 31,
    season_id: 2
  },
  john: {
    name: 'John',
    color: 'red',
    material: 'acetate',
    price: 10000,
    description: `You'll look totally British in these specs.`,
    image: 'http://i.imgur.com/dHxKtyq.png',
    quantity: 84,
    season_id: 2
  },
  sam: {
    name: 'Sam',
    color: 'multi',
    material: 'acetate',
    price: 26000,
    description: `You'll look totally spiffy in these specs.`,
    image: 'http://i.imgur.com/kNe7EV8.png',
    quantity: 12,
    season_id: 3
  },
  ian: {
    name: 'Ian',
    color: 'gold',
    material: 'metal',
    price: 16500,
    description: `You'll look totally fresh in these specs.`,
    image: 'http://i.imgur.com/tcvgy5p.png',
    quantity: 31,
    season_id: 3
  },
  lisa: {
    name: 'Lisa',
    color: 'brown',
    material: 'mixed',
    price: 12500,
    description: `You'll look totally retro in these specs.`,
    image: 'http://i.imgur.com/Icvi1y4.png',
    quantity: 106,
    season_id: 3
  },
  yoonah: {
    name: 'Yoo-Nah',
    color: 'brown',
    material: 'acetate',
    price: 19500,
    description: `You'll look totally Harry-Potter-ish in these specs.`,
    image: 'http://i.imgur.com/MQ2Tv9C.png',
    quantity: 8,
    season_id: 4
  },
  robbyn: {
    name: 'Robbyn',
    color: 'blue',
    material: 'acetate',
    price: 23500,
    description: `You'll look totally smart in these specs.`,
    image: 'http://i.imgur.com/GVwBDLx.png',
    quantity: 76,
    season_id: 4
  },
  damon: {
    name: 'Damon',
    color: 'multi',
    material: 'mixed',
    price: 20500,
    description: `You'll look totally vogue in these specs.`,
    image: 'http://i.imgur.com/NHnYUPc.png',
    quantity: 49,
    season_id: 4
  }
})

const orders = seed(Order,
  ({users}) => ({
    order1: {
      status: 'in-progress',
      user_id: users.marcos.id
    },
    order2: {
      status: 'shipped',
      user_id: users.user.id
    }
  })
)

const reviews = seed(Review,
  ({users, glasses}) => ({
    review1: {
      text: 'Awful',
      rating: 5,
      user_id: users.natasha.id,
      glass_id: glasses.natasha.id
    },
    review2: {
      text: 'INCREDIBLE',
      rating: 3,
      user_id: users.pim.id,
      glass_id: glasses.omri.id
    },
    review3: {
      text: 'Recommended!',
      rating: 4,
      user_id: users.user.id,
      glass_id: glasses.damon.id
    }
  })
)

const glassesOrdersTable = seed(GlassesOrders,
  ({orders, glasses}) => ({
    association1: {
      order_id: orders.order1.id,
      glass_id: glasses.omri.id
    },
    association2: {
      order_id: orders.order1.id,
      glass_id: glasses.sam.id
    },
    association3: {
      order_id: orders.order2.id,
      glass_id: glasses.john.id
    },
    association4: {
      order_id: orders.order1.id,
      glass_id: glasses.daniel.id
    },
    association5: {
      order_id: orders.order1.id,
      glass_id: glasses.pim.id
    }
  })
)

if (module === require.main) {
  db.didSync
    .then(() => db.sync({force: true}))
    .then(seedEverything)
    .finally(() => process.exit(0))
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
  }
}

// seed(Model: Sequelize.Model, rows: Function|Object) ->
//   (others?: {...Function|Object}) -> Promise<Seeded>
//
// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others={}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
            // Is other a function? If so, call it. Otherwise, leave it alone.
            typeof other === 'function' ? other() : other)
      ).then(rows)
    }

    return Promise.resolve(rows)
      .then(rows => Promise.props(
        Object.keys(rows)
          .map(key => {
            const row = rows[key]
            return {
              key,
              value: Promise.props(row)
                .then(row => Model.create(row)
                  .catch(error => { throw new BadRow(key, row, error) })
                )
            }
          }).reduce(
            (all, one) => Object.assign({}, all, {[one.key]: one.value}),
            {}
          )
        )
      )
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}

module.exports = Object.assign(seed, {users, seasons, glasses, orders, reviews})
