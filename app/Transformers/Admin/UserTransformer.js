'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')

/**
 * UserTransformer class
 *
 * @class UserTransformer
 * @constructor
 */
class UserTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
     // add your transformation object here
     name: model.name,
     surname: model.surname,
     email: model.email,
     id: model.id
    }
  }
}

module.exports = UserTransformer
