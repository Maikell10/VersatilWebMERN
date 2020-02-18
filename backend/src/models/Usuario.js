const Sequelize = require('sequelize')
const db = require('../database/db')

const Usuario = db.sequelize.define(
    'usuarios',
    {
        id_usuario: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_usuario: {
            type: Sequelize.STRING
        },
        cedula_usuario: {
            type: Sequelize.INTEGER
        },
        clave_usuario: {
            type: Sequelize.STRING
        },
        id_permiso: {
            type: Sequelize.INTEGER
        },
        apellido_usuario: {
            type: Sequelize.STRING
        },
        seudonimo: {
            type: Sequelize.STRING
        },
        z_produccion: {
            type: Sequelize.STRING
        },
        cod_vend: {
            type: Sequelize.STRING
        },
        activo: {
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false
    }
)


const Personal = db.sequelize.query(
    'SELECT * FROM usuarios', 
    { type: Sequelize.QueryTypes.SELECT }
)
 
  
module.exports = {Usuario, Personal}