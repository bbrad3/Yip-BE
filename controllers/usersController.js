const models = require('../models')
const { user, company, review } = models

const usersController = {}

usersController.new = async (req, res) => {
    try {
        const newUser = await user.findOrCreate({
            where: {
                email: req.body.email
            },
            defaults: {
                name: req.body.name,
                password: req.body.password
            }
        })

        res.json({
            status: 200,
            message: 'New user created',
            user: newUser
        })
    } catch (error) {
        res.json({
            status: 400,
            message: 'Could not create user',
            error
        })
    }
}

module.exports = usersController