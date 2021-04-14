const express = require('express')
const usersRouter = express.Router()

const usersController = require('../controllers/usersController')

usersRouter.post('/new', usersController.new)

module.exports = usersRouter