const express = require('express')
const { body } = require('express-validator')
const captainController = require('../controllers/captain.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const router = express.Router()

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('firstName').isLength({ min:3 }).withMessage("Enter a valid first name"),
    body('password').isLength({ min:8 }).withMessage('Password must be atleast 8 letters long'),
    body('vehicle.color').isLength({ min:3 }).withMessage('Enter a valid color'),
    body('vehicle.plate').isLength({ min:3 }).withMessage('Enter a valid plate number'),
    body('vehicle.capacity').isInt({ min:1 }).withMessage('Enter a valid capacity'),
    body('vehicle.vehicleType').isIn([ 'Car', 'Bike', 'Auto']).withMessage('Enter a valid vehicle type')
], captainController.registerCaptain)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min:8 }).withMessage('Password must be atleast 8 letters long')
], captainController.loginCaptain)

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile)

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)

module.exports = router 