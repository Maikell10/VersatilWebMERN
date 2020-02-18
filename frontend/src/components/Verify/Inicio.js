import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import jwt from 'jsonwebtoken'
import ReactTooltip from 'react-tooltip'

export default class Inicio extends Component {

    state = {
        users: []
    }

    api = {
        user: 'http://localhost:3000/users/'
    }

    async componentDidMount() {
        const res = await axios.post(this.api.user + localStorage.getItem('userId'), {
            token: localStorage.getItem('usertoken')
        })
        this.setState({ users: res.data })
        //console.log(this.state.users)
    }

    render() {

        if (!localStorage.usertoken) {
            localStorage.setItem('redirect', 'Debes logearte primero')
            return (
                <Redirect to="/login" />
            )
        }

        if (localStorage.usertoken) {
            jwt.verify(localStorage.usertoken, 'secret', (err, decoded) => {
                if (err) {
                    //console.log('Token Expired')
                    localStorage.setItem('redirect', 'Sesión expirada')
                    //localStorage.removeItem('usertoken')
                    return (
                        <Redirect to="/login" />
                    )
                }
            })
        }

        return (
            <div className="row mt-5">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header p-5">
                            <h1 className="text-center font-weight-bold">Bienvenido {this.state.users.seudonimo} <i className="fas fa-user pr-2 cyan-text"></i></h1>
                            <hr />
                        </div>
                        <div className="card-body ml-auto mr-auto">
                            <ul className="nav md-pills nav-justified pills-primary" role="tablist">
                                <li className="nav-item m-auto">
                                    <Link className="nav-link p-4" to="produccion.php">
                                        <i className="fas fa-table fa-3x"></i> <h4>Producción</h4>
                                    </Link>
                                </li>
                                <li className="nav-item m-auto">
                                    <Link className="nav-link p-4" to="renovacion.php">
                                        <i className="fas fa-stopwatch fa-3x"></i> <h4>Renovación</h4>
                                    </Link>
                                </li>
                                <li className="nav-item m-auto">
                                    <Link className="nav-link p-4" to="administracion.php">
                                        <i className="far fa-clock fa-3x"></i> <h4>Administración</h4>
                                    </Link>
                                </li>
                                <li className="nav-item m-auto">
                                    <Link className="nav-link p-4" to="graficos.php">
                                        <i className="fas fa-chart-line fa-3x"></i> <h4>Gráficos</h4>
                                    </Link>
                                </li>
                                <li className="nav-item m-auto">
                                    <Link className="nav-link p-4" to="#tasks-1" role="tab" data-toggle="tab">
                                        <i className="fas fa-list-ul fa-3x"></i> <h4>Siniestros</h4>
                                    </Link>
                                </li>
                            </ul>

                            <div className="tab-content tab-space">
                                <div className="tab-pane" id="tasks-1">Módulo en contrucción Siniestros</div>
                            </div>





                        </div>
                        <div className="section" style={{ backgroundColor: '#40A8CB' }}>
                            <div className="container p-5">
                                <div className="row">
                                    <div className="col-md-12 ml-auto mr-auto">

                                        <div className="card card-cascade narrower">

                                            <div className="card-body card-body-cascade">
                                                <div className="form-header blue-gradient">
                                                    <h3>
                                                        <i className="fas fa-search"></i> Busqueda General de Póliza</h3>
                                                </div>


                                                <form className="form text-center" method="get" action="b_poliza_busq.php">
                                                    <div className="md-form col-md-6 mx-auto">
                                                        <input type="text" className="form-control" id="busq" name="busq" autoComplete="off" data-toggle="tooltip" data-placement="bottom" data-tip="Busqueda General de Póliza por Nº de Póliza, id Titular, Nombre y Apellido del Titular" />
                                                        <button type="submit" id="btnBusq" className="btn blue-gradient btn-lg">Buscar</button>
                                                    </div>

                                                    <ReactTooltip />

                                                </form>

                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}