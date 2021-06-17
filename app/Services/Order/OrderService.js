'use strict'

const { isArrayEmpty, isArrayNotEmpty } = use('App/Helpers')

class OrderCreationService {
    constructor(model) {
        this.model = model
    }

    async syncItems(items) {
        if(!Array.isArray(items)) {
            return false
        }
        await this.model.items().createMany(items)
    }

    async updateItems(items) {
        let currentItems = await this.model
            .items()
            .whereIn('id', items.map(item => item.id))
            .fetch()

        await this.model
            .items()
            .whereNotIn('id', items.map(item => item.id))
            .delete()

        await Promise.all(
            currentItems.rows.map(async item => {
                item.fill(items.find(n => n.id === item.id))
                await item.save()
            })
        )
    }
}

module.exports = OrderCreationService