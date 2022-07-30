const express = require('express')
const validateToken = require("../middlewares/authMiddleware")
const router = express.Router()
const { get_cars, get_car, create_cars, delete_car} = require('../controllers/carControllers')

router.get('/cars', get_cars)
router.get('/car/:id', get_car)
router.post('/cars', validateToken, create_cars) /* auth */
router.delete('/cars/:id', validateToken, delete_car) /* auth */

module.exports = router
