const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectToDb = require('./db/Db')
const userRoute = require('./routes/user.route')
const captainRoute = require('./routes/captain.route')
const cookieparser = require('cookie-parser')

dotenv.config()

const app = express()
connectToDb()

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieparser())

app.get('/', (req, res) => {
    res.send("Hello World ")
})
app.use('/users', userRoute)
app.use('/captains', captainRoute)

module.exports = app