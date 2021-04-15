const models = require('../models')
const { user, company, review } = models

const reviewsController = {}


reviewsController.showAll = async(req, res) => {
    try {
        const allReviews = await review.findAll()
        res.json({
            status: 200,
            reviews: allReviews,
            message: "Here is all the review"

        })
    } catch (error) {
        res.json({
            status: 404,
            message: 'can not find the reviews of all company '

        })
    }

}





module.exports = reviewsController