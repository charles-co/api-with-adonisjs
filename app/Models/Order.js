'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {

    static boot() {
        super.boot()

        this.addHook('afterFind', 'OrderHook.updateValues')
        this.addHook('afterPaginate', 'OrderHook.updateCollectionValues')
    }

    // Relationship between Order and User
    user() {
        return this.belongsTo('App/Models/User', 'user_id', 'id')
    }

    // Relationship between Order and Items
    items() {
        return this.hasMany('App/Models/OrderItem')
    }
}

module.exports = Order
