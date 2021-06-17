'use strict'
const User = use('App/Models/User')
const Role = use('Role')

class AuthController {
    async register({ request, response }) {
        try {
            const { name, surname, email, mobile, password, password_confirmation } = request.all()

            const user = await User.create({ name, surname, email, mobile, password })
        
            const userRole = await Role.findBy('slug', 'client')
            await user.roles().attach([userRole.id])

            return response
                .status(201)
                .send({data: user})
            
        } catch (error) {
            return response
                .status(400)
                .send({message: 'Error in registering user.'})
        }
    }

    async login({ request, response, auth }) {

        const {email, password} = request.all()
        let data = await auth.withRefreshToken().attempt(email, password)

        return response.send({ data })

    }

    async refresh({ request, response, auth }) {

        const refresh_token = request.input('refresh_token') || request.header('refresh_token') 

        const new_token = await auth
            .newRefreshToken()
            .generateForRefreshToken(refresh_token)

        return response.send({ data: new_token })

    }

    async logout({ request, response, auth }){
        const refresh_token = request.input('refresh_token') || request.header('refresh_token')
        
        await auth
            .authenticator('jwt')
            .revokeTokens([refresh_token], true)
        
        return response.status(204).send({})

    }

    async forgot({ request, response }) {

    }

    async remember({ request, response }) {

    }
}

module.exports = AuthController
