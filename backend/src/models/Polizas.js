const Sequelize = require('sequelize')
const db = require('../database/db')

const Polizas = db.sequelize.define(
    'poliza',
    {
        id_poliza: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cod_poliza: {
            type: Sequelize.STRING
        },
        f_poliza: {
            type: Sequelize.DATE
        },
        f_emi: {
            type: Sequelize.DATE
        },
        tcobertura: {
            type: Sequelize.STRING
        },
        f_desdepoliza: {
            type: Sequelize.DATE
        },
        f_hastapoliza: {
            type: Sequelize.DATE
        },
        currency: {
            type: Sequelize.INTEGER
        },
        id_tpoliza: {
            type: Sequelize.INTEGER
        },
        sumaasegurada: {
            type: Sequelize.DECIMAL
        },
        id_zproduccion: {
            type: Sequelize.INTEGER
        },
        codvend: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        tableName: 'poliza'
    }
)


 
  
module.exports = {Polizas}