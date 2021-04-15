const models = require('../models')
const { user, company, review } = models
<<<<<<< HEAD
<<<<<<< HEAD
const jwt = require('jsonwebtokenhow to ')
=======
const jwt = require('jsonwebtoken')
>>>>>>> 9efc2459cef39ddca8c599451974f1ce20c89a9c
=======



const jwt = require('jsonwebtoken')

>>>>>>> 224da5fb34880f5773b0dbc17d121bb4668f4d54

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

        const encryptedId = jwt.sign({userId: newUser.id}, process.env.JWT_SECRET)

        res.json({
            status: 200,
            message: 'New user created',
            user: {
                name: newUser.name,
                email: newUser.email
            },
            userId: encryptedId
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

        const encryptedId = jwt.sign({userId: foundUser.id}, process.env.JWT_SECRET)

        if (foundUser.password === req.body.password) {
            res.json({
                status: 200,
                user: {
                    name: foundUser.name,
                    email: foundUser.email
                },
                userId: encryptedId,
                message: 'login works!'
            })

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

usersController.findOne = async (req, res) => {
    try {
        const msg = await req.headers.authorization
        const foundUser = await decryptId(msg)
        
        res.json({
            status: 200,
            message: 'Here is your user',
            user: foundUser
        })
    } catch (error) {
        res.json({
            status: 404,
            message: 'User not found',
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
            user: {
                name: foundUser.name,
                email: foundUser.email
            },
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
        let userDestroyed = await deleteUser.destroy()
        res.json({
            status: 200,
            message: 'Delete function works!',
            userDestroyed

        })
    } catch (error) {
        res.json({
            error,
            status: 400,
            message: 'delete function is not working'
        })
    }
}

async function decryptId(encryptedId) {
    console.log('ENCRYPTED USERID MIDDLEWARE WORKED!', encryptedId)

    const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)

    const foundUser = await user.findOne({
        where: { id: decryptedId.userId }
    })

    return foundUser
}

module.exports = usersController