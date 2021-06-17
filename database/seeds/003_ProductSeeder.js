'use strict'

/*
|--------------------------------------------------------------------------
| ProductSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Product = use('App/Models/Product')


class ProductSeeder {
  async run () {
    const products = await Factory.model('App/Models/Product').createMany(30)
    await console.log(products)
  }
}

module.exports = ProductSeeder
