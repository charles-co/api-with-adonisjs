'use strict'

class AuthRegister {
  get rules () {
    return {
      // validation rules
      name: 'required',
      surname: 'required',
      email: 'required|email|unique:users,email',
      password: 'required|confirmed',
      mobile: 'required'
    }
  }

  get messages() {
    return {
      'name.required': 'Name is required.',
      'surname.required': 'Surname is required.',
      'email.required': 'Email is required.',
      'email.email': 'Email is invalid.',
      'email.unique': 'Email must be unique.',
      'password.required': 'Password is required.',
      'password.confirmed': 'Password don\'t match.',
    }
  }
}

module.exports = AuthRegister
