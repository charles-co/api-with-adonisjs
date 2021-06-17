'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.group(() => {

  // Products resource methods:

  Route.resource('products', 'ProductController').apiOnly()

  // Users resource methods:

  Route.resource('users', 'UserController')
  .apiOnly()
  .validator(new Map([
    [['users.store'], ['Admin/StoreUser']],
    [['users.update'], ['Admin/StoreUser']],
  ]))

  // Orders resource methods:
  Route.resource('orders', 'OrderController')
  .apiOnly()
  .validator(new Map([[['orders.store'], ['Admin/StoreOrder']]]))

  // Dashboard route
  
  Route.get('dashboard', 'DashboardController.index').as('dashboard')

}).prefix('api/admin')
  .namespace('Admin')
  .middleware(['auth', 'is:( admin || manager )'])