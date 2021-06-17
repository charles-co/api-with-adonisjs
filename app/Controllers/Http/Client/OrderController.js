'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Order = use('App/Models/Order')
const Transformer = use('App/Transformers/Admin/OrderTransformer')
const Service = use('App/Services/Order/OrderService')

/**
 * Resourceful controller for interacting with orders
 */
class OrderController {
  /**
   * Show a list of all orders.
   * GET orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, transform, pagination, auth }) {
    // order number
    const client = await auth.getUser()
    const number = request.input('number')
    const query = Order.query()
    if (number) {
      query.where('id', 'LIKE', `${number}`)
    }

    query.where('user_id', client.id)

    const results = await query
      .orderBy('id', 'DESC')
      .paginate(pagination.page, pagination.limit)

    const orders = await transform.paginate(results, Transformer)
    return response.send(orders)
  }

  /**
   * Create/save a new order.
   * POST orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth, transform }) {
    try {
        const items = request.input('items') // array
        const client = await auth.getUser()
        var order = await Order.create({ user_id: client.id })
        const service = new Service(order)
        if (items.length > 0) {
            await service.syncItems(items)
        }
        // Instanciate, hooks create subtotals
        order = await Order.find(order.id)

        order = await transform.include('items').item(order, Transformer)
        
        return response.status(201).send(order)
    } catch (error) {
        return response.status(400).send({
            message: 'Unable to place your order!'
        })
    }
  }

  /**
   * Display a single order.
   * GET orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, response, transform, auth }) {
    const client = await auth.getUser()
    const result = await Order.query()
      .where('user_id', client.id)
      .where('id', id)
      .firstOrFail()
    const order = await transform.include('items').item(result, Transformer)
    return response.send(order)
  }

  /**
   * Update order details.
   * PUT or PATCH orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response, auth, transform }) {
    const client = await auth.getUser()
    var order = await Order.query()
      .where('user_id', client.id)
      .where('id', id)
      .firstOrFail()

    try {
        const { items, status } = request.all()
        order.merge({ user_id: client.id, status })
        const service = new Service(order)
        await service.updateItems(items)
        await order.save()
        order = await transform
            .include('items')
            .item(order, Transformer)
        return response.send(order)
    } 
    catch (error) {
        return response.status(400).send({
            message: 'We were unable to update your order!'
        })
    }
  }
}

module.exports = OrderController
