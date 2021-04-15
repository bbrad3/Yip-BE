const express = require('express')
const usersRouter = express.Router()

const usersController = require('../controllers/usersController')

usersRouter.post('/new', usersController.new)
usersRouter.post('/login',usersController.login)
usersRouter.delete('/delete',usersController.delete)
usersRouter.put('/update',usersController.update)
module.exports = usersRouter