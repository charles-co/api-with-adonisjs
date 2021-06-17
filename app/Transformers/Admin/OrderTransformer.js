'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')

const UserTransformer = use('App/Transformers/Admin/UserTransformer')
const OrderItemTransformer = use('App/Transformers/Admin/OrderItemTransformer')


/**
 * OrderTransformer class
 *
 * @class OrderTransformer
 * @constructor
 */
class OrderTransformer extends BumblebeeTransformer {
    static get availableInclude () {
        return [
            'user', 
            'items'
        ]
    }
    /**
     * This method is used to transform the data.
    */
    transform (model) {
        model = model.toJSON()

        return {
        // add your transformation object here
            id: model.id,
            status: model.status ? model.status : "pending",
            qty_items: model.__meta__ && model.__meta__.qty_items ? model.__meta__.qty_items : 0,
            total: model.total ? parseFloat(model.total.toFixed(2)) : 0,
            date: model.created_at
        }
    }

    includeUser(model) {
        return this.item(model.getRelated('user', UserTransformer))
    }

    includeItems(model) {
        return this.collection(model.getRelated('items'), OrderItemTransformer)
    }
}

module.exports = OrderTransformer
