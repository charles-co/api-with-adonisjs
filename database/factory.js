'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker) => {
  return {
    name: faker.first(),
    surname: faker.last(),
    email: faker.email({ domain: 'fakemail.com'}),
    password: 'secret',
    mobile: faker.phone()
  }
})
  
Factory.blueprint('App/Models/Product', (faker) => {
    return {
      name: faker.animal(),
      description: faker.sentence(),
      price: faker.floating({ min: 0, max: 1000, fixed: 2}),
      image_url: faker.avatar({protocol: 'https'})
  
    }
})