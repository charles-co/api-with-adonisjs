'use strict'

/*
|--------------------------------------------------------------------------
| ClientSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Role = use('Role')
const User = use('App/Models/User')

class ClientSeeder {
  async run() {
    const role = await Role.findBy('slug', 'client')
    const clients = await Factory.model('App/Models/User').createMany(30)
    await Promise.all(
      clients.map(async client => {
        await client.roles().attach([role.id])
      })
    )
    const testclient = await User.create({
        name: 'Marylyn',
        surname: 'Cavalcanti',
        email: 'marylyn@gmail.com',
        password: 'secret',
        mobile: '+2347039094842'
    })
    await console.log(testclient)
    await console.log(clients)
    await testclient.roles().attach([role.id])

    const user = await User.create({
      name: 'John',
      surname: 'Johnson',
      email: 'admin@admin.com',
      password: 'secret',
      mobile: '+2347039094842'
    })
    const adminRole = await Role.findBy('slug', 'admin')
    //await console.log(user)
    await user.roles().attach([adminRole.id])
  }
}

module.exports = ClientSeeder