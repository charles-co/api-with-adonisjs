'use strict'

const OrderHook = exports = module.exports = {}

OrderHook.updateValues = async (model) => {

    model.$sideLoaded.qty_items = await model.items().getSum('quantity')
    model.total = await model.items().getSum('subtotal')
}


OrderHook.updateCollectionValues = async (models) => {

    for(let model of models) {
        model = await OrderHook.updateValues(model)
    }
}

