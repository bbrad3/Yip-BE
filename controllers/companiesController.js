const models = require('../models')
const { user, company, review } = models
const companiesController = {}



companiesController.getAll = async(req, res) => {

    try {
        const allCompanies = company.findAll()
        res.json({
            status: 200,
            allCompanies,
            message: "Here is your companies"
        })
    } catch (error) {
        res.json({
            error,
            status: 404,
            message: 'Can not find all companies'
        })
    }
}

companiesController.getOne = async(req, res) => {

    try {
        const oneCompany = company.getOne({

            where: {
                id: req.headers.id
            }

        })
        res.json({
            status: 200,
            oneCompany,
            message: 'This is the company you are looking for'

        })
    } catch (error) {
        res.json({
            error,
            status: 404,
            message: 'Can not find this one company'

        })
    }

}

companiesController.new = async(req, res) => {

    try {
        const newCompany = await company.findOrCreate({
            where: {

                name: req.body.name,
                address: req.body.address
            },
            defaults: {

                type: req.body.type,
                description: req.body.description,
                image: req.body.image
            }

        })
        res.json({

            status: 200,
            newCompany,
            message: 'Company Created'

        })
    } catch (error) {
        res.json({
            error,
            status: 404,
            message: 'Can not create a company'
        })
    }
}

companiesController.update = async(req, res) => {

    try {
        const newUpdate = req.body

        const newCompany = await company.findOne({
            where: {
                id: req.headers.id
            }
        })
        let result = await newCompany.update(newUpdate)
        res.json({
            result,
            status: 200,
            message: 'company has been updated'


        })
    } catch (error) {
        res.json({
            error,
            status: 400,
            message: 'Can not update company info'

        })
    }

}

companiesController.delete = async(req, res) => {

    try {
        const findCompany = await company.findOne({
            where: {
                id: req.headers.id
            }
        })
        const response = findCompany.destroy()

        res.json({
            response,
            status: 200,
            message: 'company has been deleted'

        })
    } catch (error) {
        res.json({
            error,
            status: 400,
            message: "Can not delete company"
        })
    }
}





module.exports = companiesController;