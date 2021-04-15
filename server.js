const express = require('express')
const app = express()
const cors = require('cors')
const routesReport = require('rowdy-logger').begin(app)
require('dotenv').config()

// MIDDLEWARE
app.use(cors())
app.use(express.json())

// ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to the root route!')
})

const usersRouter = require('./routers/usersRouter')
app.use('/users', usersRouter)

const companiesRouter = require('./routers/companiesRouter')
app.use('/companies', companiesRouter)

const reviewsRouter = require('./routers/reviewsRouter')
app.use('/reviews', reviewsRouter)

// SERVER
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    routesReport.print()
    console.log(`Server listening on port ${PORT}`)
})