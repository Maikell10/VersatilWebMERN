const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userCtrl = {};

const { Usuario, Personal } = require('../models/Usuario')

var token_auth, token_veryfy

verifyTokena = async (req, res) => {
    
    if (token_auth) {
        jwt.verify(token_auth, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                token_veryfy = 'Invalid Token'
            } else {
                token_veryfy = 'Token Verify'
            }
        });
    } else {
        token_veryfy = 'Invalid Token'
    }
}

userCtrl.getUsers = async (req, res) => {
    
    token_auth = req.body.token
    //verifyTokena()
    //console.log(token_veryfy)
    if (token_veryfy == 'Invalid Token') {
        return res.json({ mensaje: 'Token inválida' });
    }
    if (token_veryfy == 'Token Verify') {
        const users = await Usuario.findAll()
        res.json(users)
    }
}

userCtrl.users = async (req, res) => {
        const users = await Usuario.findAll()
        res.json(users)
}

userCtrl.createUsers = async (req, res) => {
    const today = new Date()
    const userData = {
        nombre_usuario: req.body.nombre,
        cedula_usuario: req.body.cedula,
        clave_usuario: req.body.password,
        id_permiso: req.body.id_permiso,
        apellido_usuario: req.body.apellido,
        seudonimo: req.body.username,
        z_produccion: req.body.z_produccion,
        cod_vend: req.body.cod_vend,
        activo: req.body.activo
    }

    await Usuario.findOne({
        where: {
            seudonimo: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.clave_usuario = hash
                    Usuario.create(userData)
                        .then(user => {
                            res.json({ status: 'User registered' })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else {
                res.json({ error: 'User already exists' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
}

userCtrl.loginUser = async (req, res) => {
    await Usuario.findOne({
        where: {
            seudonimo: req.body.username
        }
    })
    .then(user => {
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.clave_usuario)) {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 7200
                })
                
                res.status(200).json({ success: 'Success Login', token: token, userId: user.id_usuario })
            } else {
                res.status(400).json({ error: 'Password Incorrect' })
            }
        } else {
            res.status(400).json({ error: 'User does not exist' })
        }
    })
    .catch(err => {
        res.status(400).json({ error: 'err' })
    })
}

userCtrl.getUser = async (req, res) => {
    token_auth = req.body.token
    verifyToken()
    if (token_veryfy == 'Invalid Token') {
        return res.json({ mensaje: 'Token inválida' });
    }
    if (token_veryfy == 'Token Verify') {
        console.log('aja')
        const user = await Usuario.findOne({
            where: {
                id_usuario: req.params.id
            }
        })
        if (user) {
            res.json(user)
        } else {
            res.status(400).json({ error: 'User does not exists' })
        }
    }
}

userCtrl.updateUser = async (req, res) => {
    token_auth = req.body.token
    verifyToken()
    if (token_veryfy == 'Invalid Token') {
        return res.json({ mensaje: 'Token inválida' });
    }
    if (token_veryfy == 'Token Verify') {
        const today = new Date()
        const userData = {
            nombre_usuario: req.body.nombre,
            cedula_usuario: req.body.cedula,
            clave_usuario: req.body.password,
            id_permiso: req.body.id_permiso,
            apellido_usuario: req.body.apellido,
            seudonimo: req.body.seudonimo,
            z_produccion: req.body.z_produccion,
            cod_vend: req.body.cod_vend,
            activo: req.body.activo
        }

        const user = await Usuario.findOne({
            where: {
                id_usuario: req.params.id
            }
        })
            .then(user => {
                if (req.body.password === '') {
                    userData.password = user.password
                    user.update(userData)
                        .then(user => {
                            res.status(200).json({ error: 'User updated' })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                } else {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        userData.password = hash
                        user.update(userData)
                            .then(user => {
                                res.status(200).json({ error: 'User updated' })
                            })
                            .catch(err => {
                                res.send('error: ' + err)
                            })
                    })
                }
            })
            .catch(err => {
                res.status(400).json({ error: err })
            })
    }
}

userCtrl.deleteUser = async (req, res) => {
    token_auth = req.body.token
    verifyToken()
    if (token_veryfy == 'Invalid Token') {
        return res.json({ mensaje: 'Token inválida' });
    }
    if (token_veryfy == 'Token Verify') {
        await Usuario.destroy({
            where: {
                id_usuario: req.params.id
            }
        })
            .then(user => {
                if (user) {
                    res.status(200).json({ success: 'User deleted' })
                } else {
                    res.status(400).json({ error: 'User does not deleted' })
                }
            })
            .catch(err => {
                res.status(400).json({ error: err })
            })
    }
}

module.exports = userCtrl