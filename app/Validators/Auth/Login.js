'use strict'

class AuthLogin {
  get rules () {
    return {
      // validation rules
      email: 'required|email',
      password: 'required'
    }
  }

  get messages() {
    return {
      'email.required': 'Email is required.',
      'email.email': 'Email is invalid.',
      'password.required': 'Password is required.',
    }
  }
}

module.exports = AuthLogin
