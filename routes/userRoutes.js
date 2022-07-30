const express = require('express')
const validateToken = require("../middlewares/authMiddleware")
const router = express.Router()
const { get_user_cars, get_user, get_users } = require('../controllers/userControllers')

router.get('/user/:id/cars', validateToken, get_user_cars) /* auth */
router.get('/user', validateToken, get_user) /* auth */
router.get('/', get_users)

module.exports = router
