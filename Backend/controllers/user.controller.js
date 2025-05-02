const userModel = require('../models/user.model')
const userService = require('../services/user.service')
const { validationResult } = require('express-validator')
const blackllistModel = require('../models/blacklist.model')

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req)

    if( !errors.isEmpty ) {
        return res.status(400).json({ error: errors.array })
    }

    const { firstName, lastName, email, password } = req.body

    const isUserExist = await userModel.findOne({ email })
    if( isUserExist ) {
        return res.status(400).json({ message: 'User already exists' })
    }   

    const hashedPassword = await userModel.hashPassword(password)
    
    const user = await userService.createUser ({
        firstName,
        lastName,
        email,
        password: hashedPassword
    })

    const token = user.generateAuthToken()

    res.status(200).json({ token, user })
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req)
    if( !errors.isEmpty ) {
        return res.status(404).json({ errors: errors.array })
    }

    const { email, password } = await req.body

    const user = await userModel.findOne({ email }).select('+password')

    if( !user ) {
        return res.status(401).json({ message: 'Wrong Email or Password'} )
    }

    const isMatch = await user.comparePassword(password)

    if( !isMatch ) {
        return res.status(401).json({ message: 'Wrong Email or Password'} )
    }

    const token = user.generateAuthToken()

    res.cookie( 'token', token )

    res.status(200).json({ token, user })
} 

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user)
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token')

    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ]

    await blackllistModel.create({ token })

    res.status(200).json({ message: 'Logged out successfully' })
}