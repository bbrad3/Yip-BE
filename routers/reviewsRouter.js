const express = require('express')
const reviewsRouter = express.Router()

const reviewsController = require('../controllers/reviewsController')


reviewsRouter.post('/:companyId/create/:userId', reviewsController.create)
reviewsRouter.delete('/:companyId/delete/:userId', reviewsController.delete)

module.exports = reviewsRouter