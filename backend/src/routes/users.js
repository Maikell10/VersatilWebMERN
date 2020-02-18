const { Router } = require('express')
const router = Router()
const cors = require('cors')


router.use(cors())


const { getUsers, createUsers, loginUser, getUser, updateUser, deleteUser, users } = require('../controllers/usuario.controller')

router.route('/')
    .post(getUsers) 
    .get(users)

router.route('/register')
    .post(createUsers)

router.route('/login')
    .post(loginUser)

router.route('/:id')
    .post(getUser) 
    .put(updateUser) 
    .delete(deleteUser)

module.exports = router