const express = require('express')
const router = express.Router()
const { get_cars, get_car, create_cars, delete_car} = require('../controllers/carControllers')

router.get('/cars', get_cars)
router.get('/car/:id', get_car)
router.post('/cars', create_cars)
router.delete('/cars/:id', delete_car)

module.exports = router
