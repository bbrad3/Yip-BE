const models = require('../models')
const { user, company, review } = models
const companiesController = {}



companiesController.getAll = async(req, res) => {

    try {
        const allCompanies = await company.findAll()
        res.json({
            status: 200,
            companies: allCompanies,
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
        const oneCompany = await company.findOne({
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
            },
            defaults: {
                type: req.body.type,
                description: req.body.description,
                address: req.body.address,
                image: req.body.image
            }
        })

        const foundUser = decryptId(req.headers.authorization)

        const association = await newCompany.addUser(foundUser)

        res.json({
            status: 200,
            newCompany,
            message: 'Company Created',
            associated: association
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
        const updates = req.body

        const foundCompany = await company.findOne({
            where: {
                id: req.headers.id
            }
        })
        let result = await foundCompany.update(updates)
        res.json({
            company: foundCompany,
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


async function decryptId(encryptedId) {
    console.log('ENCRYPTED USERID MIDDLEWARE WORKED!', encryptedId)

    const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)

    const foundUser = await user.findOne({
        where: { id: decryptedId.userId }
    })

    return foundUser
}


module.exports = companiesController;