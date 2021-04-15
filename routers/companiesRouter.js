const express = require('express')
const companiesController = require('../controllers/companiesController')
const companiesRouter = express.Router()


companiesRouter.get('/all', companiesController.getAll)

companiesRouter.get('/one', companiesController.getOne)

companiesRouter.post('/new', companiesController.new)

companiesRouter.put('/update', companiesController.update)

companiesRouter.delete('/delete', companiesController.delete)




module.exports = companiesRouter