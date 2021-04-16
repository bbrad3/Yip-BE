const models = require('../models')
const { user, company, review } = models

const reviewsController = {}
const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')
reviewsController.create = async(req, res) => {

    try {
        const reviewContent = req.body
        console.log(reviewContent)

        const businessUser = await decryptId(req.params.userId)
        // const businessUser = await user.findOne({

        //     where: {
        //         id: req.params.userId
        //     }
        // })
        const companyId = await company.findOne({
            where: {
                id: req.params.companyId
            }
        })
        const newAssociation = await review.create({
            userId: businessUser.id,
            companyId: companyId.id,
            content: reviewContent.content,
            rating: reviewContent.rating

        })


        res.json({ newAssociation })

        // find user => local storage 
        // find business => get the id from the user info 
        // assocaite both of them 
        // need to add the rating and review content to the business owner and the company 
    } catch (error) {
        console.log(error);
        res.json({
            error,
            message:"review create is not working !"
        })
    }

}


reviewsController.delete = async(req, res) => {
    try {


        // const businessUser = await decryptId(req.params.userId)
        const deleteUserBusiness = await user.findOne({
            where: { id: req.params.userId }
        })
        const deleteCompany = await user.findOne({
            where: { id: req.params.companyId }
        })
        const foundReview = await review.findOne({
            where: {
                [Op.and]: [
                    { userId: deleteUserBusiness.id },
                    { companyId: deleteCompany.id }
                ]
            }

        })
        const deletedReview = foundReview.destroy()
        res.json({ deletedReview })
    } catch (error) {
        res.json({
            error
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




module.exports = reviewsController