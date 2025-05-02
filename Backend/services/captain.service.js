const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
    firstName, lastName, email, password, color, plate, capacity, vehicleType
}) => {
    if( !firstName || !email || !password || !color || !plate || !vehicleType || !capacity ) {
        throw new Error ("All fields are required !!!")
    }

    const captain = captainModel.create({
        firstName,
        lastName,
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType,
        }
    })
    return captain
}