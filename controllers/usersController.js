const models = require('../models')
const { user, company, review } = models

const usersController = {}

usersController.new = async(req, res) => {
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

usersController.login = async(req, res) => {
    try {
        const foundUser = await user.findOne({
            where: {
                email: req.body.email
            }
        })
        if (foundUser.password === req.body.password) {
            res.json({ user: foundUser, message: 'login works!' })

        } else {
            res.status(401).json({ error: 'wrong password' })
        }
    } catch (error) {
        res.json({
            status: 404,
            message: 'login not work!!',
            error
        })
    }
}

usersController.update = async(req, res) => {

    console.log(req.headers);
    try {

        const foundUser = await user.findOne({
            where: {
                id: req.headers.userid
            }
        })


        let updates = await foundUser.update(req.body)
        res.json({
            user: foundUser,
            message: 'update fuction working !',
            status: 200,
            updates
        })

    } catch (error) {
        res.json({
            error,
            message: 'update is not working!',
            status: 400
        })
    }
}

usersController.delete = async(req, res) => {
    try {
        const deleteUser = await user.findOne({
            where: {
                id: req.headers.userid
            }
        })
        let destroyFunction = await deleteUser.destroy()
        res.json({
            status: 200,
            message: 'delete function works!',
            user: destroyFunction

        })
    } catch (error) {
        res.json({
            error,
            status: 400,
            message: 'delete function is not working'
        })
    }
}


module.exports = usersController