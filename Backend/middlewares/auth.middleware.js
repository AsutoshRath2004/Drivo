const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const blacklistModel = require('../models/blacklist.model')
const captainModel = require('../models/captain.model')

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req. headers.authorization?.split(' ')[ 1 ]

    if( !token ) {
        res.status(404).json({ message: 'Unauthorized User' })
    }

    const isblacklisted = await blacklistModel.findOne({ token: token })

    if( isblacklisted ) {
        return res.status(404).json({ message: 'Unauthorized User' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded._id)

        req.user = user

        return next()

    } catch (error) {
        return res.status(404).json({ message: 'Unauthorized User' })
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req. headers.authorization?.split(' ')[ 1 ]

    if( !token ) {
        res.status(404).json({ message: 'Unauthorized User' })
    }

    const isblacklisted = await blacklistModel.findOne({ token: token })

    if( isblacklisted ) {
        return res.status(404).json({ message: 'Unauthorized User' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const captain = await captainModel.findById(decoded._id)

        req.captain = captain

        return next()

    } catch (error) {
        return res.status(404).json({ message: 'Unauthorized User' })
    }
}