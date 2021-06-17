'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')
const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * ProductTransformer class
 *
 * @class ProductTransformer
 * @constructor
 */
class ProductTransformer extends BumblebeeTransformer {

  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
     // add your transformation object here
        id: model.id,
        name: model.name,
        price: model.price,
        image_url: model.image_url
    }
  }
  transformWithDescription (model) {
      return{
          ...this.transform(model),
          description: model.description
        }
  }
}

module.exports = ProductTransformer