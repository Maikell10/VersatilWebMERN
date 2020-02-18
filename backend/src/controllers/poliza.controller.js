const express = require('express')
const jwt = require('jsonwebtoken')

const polizaCtrl = {};

const { Polizas } = require('../models/Polizas')

let token_auth, token_veryfy

verifyToken = async (req, res) => {
    console.log('aja')
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

polizaCtrl.getPoliza = async (req, res) => {
    token_auth = req.body.token
    verifyToken()
    console.log(token_veryfy)
    if (token_veryfy == 'Invalid Token') {
        return res.json({ mensaje: 'Token inválida' });
    }
    if (token_veryfy == 'Token Verify') {
        const users = await Usuario.findAll()
        res.json(users)
    }
}

polizaCtrl.polizas = async (req, res) => {
    console.log('aja')
    const polizas = await Polizas.findAll()
    res.json('polizas')
}

module.exports = polizaCtrl