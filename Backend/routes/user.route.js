const express = require('express')
const { body } = require('express-validator')
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const router = express.Router()

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('firstName').isLength({ min:3 }).withMessage("Enter a valid first name"),
    body('password').isLength({ min:8 }).withMessage('Password must be atleast 8 letters long')
], userController.registerUser)

router.post('/login', [
    body('email').isEmail().withMessage('Enter a valid Email'),
    body('password').isLength({ min:8 }).withMessage('Enter a valid password')
], userController.loginUser)

router.get('/profile', authMiddleware.authUser , userController.getUserProfile)

router.get('/logout', authMiddleware.authUser, userController.logoutUser)



module.exports = router