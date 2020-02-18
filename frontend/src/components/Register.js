import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Register extends Component {

    state = {
        username: '',
        password: '',
        nombre: '',
        apellido: '',
        cedula: ''
    }

    api = {
        register: 'http://localhost:3000/users/register'
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = async (e) => {
        e.preventDefault()
        const user = {
            username: this.state.username,
            password: this.state.password,
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            cedula: this.state.cedula
        }
        await axios.post(this.api.register, user)
            .then(res => {
                localStorage.setItem('mensaje', res.data.status)
                this.props.history.push('/login')
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }

    render() {
        return (
            <div>
                <div className="row mt-5">
                    <div className="col-md-8 mx-auto">
                        <div className="card card-signup">
                        <div className="card-header">
                        <h2 className="card-title text-center font-weight-bold">Registrate</h2>
                        </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 mx-auto ">
                                        <form onSubmit={this.onSubmit}>
                                            <div className="md-form">
                                                <div className="input-group">
                                                    <i className="fas fa-tag fa-2x cyan-text pr-3"></i>
                                                    <input type="text" 
                                                    className="form-control" 
                                                    placeholder="Nombre" 
                                                    name="nombre" 
                                                    value={this.state.nombre}
                                                    onChange={this.onChange}
                                                    required />
                                                </div>
                                            </div>
                                            <div className="md-form">
                                                <div className="input-group">
                                                    <i className="fas fa-tag fa-2x cyan-text pr-3"></i>
                                                    <input type="text" 
                                                    className="form-control" 
                                                    placeholder="Apellido" 
                                                    name="apellido"
                                                    value={this.state.apellido}
                                                    onChange={this.onChange} 
                                                    required />
                                                </div>
                                            </div>
                                            <div className="md-form">
                                                <div className="input-group">
                                                    <i className="fas fa-tag fa-2x cyan-text pr-3"></i>
                                                    <input type="text" 
                                                    className="form-control" 
                                                    placeholder="Cedula" 
                                                    name="cedula" 
                                                    value={this.state.cedula}
                                                    onChange={this.onChange} 
                                                    required />
                                                </div>
                                            </div>

                                            <div className="md-form">
                                                <div className="input-group">
                                                    <i className="fas fa-user fa-2x cyan-text pr-3"></i>
                                                    <input type="text" 
                                                    className="form-control" 
                                                    placeholder="Seudónimo" 
                                                    name="username" 
                                                    value={this.state.username}
                                                    onChange={this.onChange} 
                                                    required />
                                                </div>
                                            </div>

                                            <div className="md-form">
                                                <div className="input-group">
                                                    <i className="fas fa-lock fa-2x cyan-text pr-3"></i>
                                                    <input type="password" 
                                                    placeholder="Contraseña" 
                                                    className="form-control" 
                                                    name="password" 
                                                    value={this.state.password}
                                                    onChange={this.onChange} 
                                                    required />
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" className="btn btn-info btn-block my-4  rounded-pill">Confirmar</button>
                                            </div>
                                        </form>
                                        <p className="text-center font-weight-bold">Luego de registrarse debe esperar un período de 24h para activación de usuario</p>
                                        <h5 className="text-center">Ya tienes una cuenta? <Link to="/login" className="text-danger font-weight-bold"><i className="material-icons">label_important</i>Ingresa</Link></h5>
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
